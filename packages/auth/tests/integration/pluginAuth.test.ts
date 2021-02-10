import Response from "@corejam/base/src/Response";
import { CorejamServer, eventEmitter } from "@corejam/base/src/Server";
import { testClient } from "@corejam/base/src/TestClient";
import * as OriginalNotify from "@corejam/notify/server/Notify";
import * as faker from "faker";
import { IncomingMessage } from "http";
import { Socket } from "net";
import * as sinon from "ts-sinon";
import {
  AccountExistsError,
  AuthenticationError,
  InvalidEmailError,
  InvalidVerificationError,
} from "../../server/Errors";
import PasswordResetConfirmed from "../../server/mail/PasswordResetConfirmed";
import RegisterVerifyMail from "../../server/mail/RegisterVerify";
import {
  meGQL,
  passwordResetGQL,
  requestPasswordResetGQL,
  userAuthenticateMutationGQL,
  userEditMutationGQL,
  userRegisterMutationGQL,
  userTokenRefreshMutationGQL,
  userUpdatePasswordMutationGQL,
  verifyEmailGQL,
} from "../../shared/graphql/Mutations";
import { paginateUsersGQL } from "../../shared/graphql/Queries";
import { MergedServerContext } from "../../shared/types/PluginResolver";
import {
  RegisterInput,
  roles,
  STATUS,
  UpdatePasswordInput,
  UserCreateInput,
  UserDB,
  UserInput,
  UserList,
} from "../../shared/types/User";

jest.mock("@corejam/notify/server/Notify");
const MockedNotify = OriginalNotify as jest.Mocked<typeof OriginalNotify>;
const Notify = new MockedNotify.default();

describe("Test Auth Plugin", () => {
  //This is the document ID we use to run various tests against instead of reading in every test
  let client, models, testID;

  const testValues: UserCreateInput = {
    active: true,
    email: faker.internet.email(),
    password: faker.internet.password(),
  };

  //Bootstrap
  beforeAll(async () => {
    client = await testClient();
    models = client.models;

    const insertedResponse = (await models.userCreate(testValues)) as UserDB;

    //Clean up object comparison
    delete testValues.password;

    expect(insertedResponse).toMatchObject(testValues);
    testID = insertedResponse.id;

    //We need to set JWT_HASH env
    process.env.JWT_HASH = "jest";
  });

  it("getUserByEmail", async () => {
    //Test that we can retrieve the same values back
    const returnedUserByEmail = await models.userByEmail(testValues.email);
    expect(returnedUserByEmail).toEqual(expect.objectContaining(testValues));
  });

  it("allUsers", async () => {
    const returnedPagination: UserDB[] = await models.allUsers();

    expect(returnedPagination.length).toBeGreaterThan(0);

    returnedPagination.map((item) => {
      if (item.id === testID) {
        const testUSer = testValues;

        expect(item).toEqual(
          expect.objectContaining({
            email: testUSer.email,
            active: testUSer.active,
          })
        );
      }
    });
  });

  it("Paginated users", async () => {
    const { query, mutate } = client;

    //Test that we can retrieve the same values back
    const unauthenticatedRequest = await query({
      query: paginateUsersGQL,
      variables: { page: 1, size: 24 },
    });

    expect(unauthenticatedRequest.errors[0]).toEqual(new AuthenticationError());

    //We want a test account as admin
    await models.userRegister({
      email: "test@test.com",
      password: "valid123Password@",
      passwordConfirm: "valid123Password@",
    }).then((user) => {
      models.userEdit(user.id, { role: [roles.ADMIN] });
    });

    const loginResponse = await mutate({
      mutation: userAuthenticateMutationGQL,
      variables: {
        email: "test@test.com",
        password: "valid123Password@",
      },
    });

    const server = CorejamServer();
    const mockContext = () => ({
      ...server.context({
        req: {
          headers: {
            authorization: loginResponse.data.userAuthenticate.token,
          },
        },
        res: {},
      }),
    });

    //Make a request with token in header
    const authClient = await testClient(
      {
        //TODO fix typings, we actually set the headers in context above
        //so we dont need to insert them here again
        req: {
          headers: {
            authorization: loginResponse.data.userAuthenticate.token,
          },
        },
        res: new Response(new IncomingMessage(new Socket())),
      },
      mockContext
    );

    //Test that we can retrieve the same values back
    const pagination = await authClient.query({
      query: paginateUsersGQL,
      variables: { page: 1, size: 24 },
    });

    const paginated: UserList = pagination.data.paginateUsers;
    expect(paginated.currentPage).toEqual(1);
    expect(paginated.items.length).toEqual((await models.allUsers()).length);
  });

  it("Update User", async () => {
    const newValues: UserInput = {
      active: false,
      email: faker.internet.email(),
    };

    const editResult = await models.userEdit(testID, newValues);

    expect(editResult).toEqual(expect.objectContaining(newValues));
  });

  it("Register and Auth", async () => {
    const newValues: RegisterInput = {
      email: faker.internet.email(),
      password: "valid123Password@",
      passwordConfirm: "valid123Password@",
    };

    const mockResponse = new Response(new IncomingMessage(new Socket()));

    const { mutate } = await testClient({
      req: { headers: {} },
      res: mockResponse,
    });

    const registerResponse = await mutate({
      mutation: userRegisterMutationGQL,
      variables: {
        data: newValues,
      },
    });

    expect(registerResponse.data.userRegister).toEqual(expect.objectContaining({ email: newValues.email }));

    const spy = sinon.default.spy();
    eventEmitter.on("loggedIn", spy);

    const loginResponse = await mutate({
      mutation: userAuthenticateMutationGQL,
      variables: {
        email: newValues.email,
        password: "valid123Password@",
      },
    });

    expect(loginResponse.data.userAuthenticate).toHaveProperty("user.email");
    expect(loginResponse.data.userAuthenticate).toHaveProperty("token");

    //Expect refreshToken cookie to have been set in headers
    const cookie = mockResponse.getHeaders()["set-cookie"];
    expect(cookie).toContain("refreshToken");

    //We should have a loggedIn event emitted
    expect(spy.called).toBe(true);
    expect(spy.calledOnce).toBe(true);
    expect(spy.calledWith({ user: newValues.email })).toBe(true);

    //Make a request with token in header
    const authResponse = new Response(new IncomingMessage(new Socket()));
    const authClient = await testClient({
      req: {
        headers: {
          authorization: loginResponse.data.userAuthenticate.token,
        },
      },
      res: authResponse,
    });

    const { mutate: authenticatedMutate } = authClient;

    const meResponse = await authenticatedMutate({
      mutation: meGQL,
    });
    expect(meResponse.data.me.email).toEqual(newValues.email);

    const cookieResponseHeaders = new Response(new IncomingMessage(new Socket()));
    const { mutate: cookieMutate } = await testClient({
      req: {
        headers: {
          cookie: `refreshToken=${loginResponse.data.userAuthenticate.token}`,
        },
      },
      res: cookieResponseHeaders,
    });

    //Refresh token
    await cookieMutate({
      mutation: userTokenRefreshMutationGQL,
    });

    //Expect refreshToken cookie to have been set in headers
    const headers = cookieResponseHeaders.getHeaders();
    const refreshedCookie = headers["set-cookie"];
    expect(refreshedCookie).toContain("refreshToken");

    const loginFailedResponse = await mutate({
      mutation: userAuthenticateMutationGQL,
      variables: {
        email: newValues.email,
        password: "wrongpassword",
      },
    });

    expect(loginFailedResponse.errors[0]).toEqual(new AuthenticationError());

    //Disable the account
    await mutate({
      mutation: userEditMutationGQL,
      variables: {
        id: registerResponse.data.userRegister.id,
        userInput: { active: false },
      },
    });

    const loginFailedResponse2 = await mutate({
      mutation: userAuthenticateMutationGQL,
      variables: {
        email: newValues.email,
        password: "any",
      },
    });

    expect(loginFailedResponse2.errors[0]).toEqual(new AuthenticationError());
  });

  it("receiveErrorOnDuplicateRegister", async () => {
    const duplicateUser: RegisterInput = {
      email: "duplicate@duplicate.com",
      password: "valid123Password@",
      passwordConfirm: "valid123Password@",
    };

    const { mutate } = await testClient();

    //First
    await mutate({
      mutation: userRegisterMutationGQL,
      variables: {
        data: duplicateUser,
      },
    });

    const expectFail = await mutate({
      mutation: userRegisterMutationGQL,
      variables: {
        data: duplicateUser,
      },
    });

    expect(expectFail.errors[0]).toEqual(new AccountExistsError());
  });

  it("update password", async () => {
    const updatePassword: UpdatePasswordInput = {
      oldPassword: "valid123Password@",
      password: "newPass",
      passwordConfirm: "newPass",
    };

    const registerValues: RegisterInput = {
      email: faker.internet.email(),
      password: "valid123Password@",
      passwordConfirm: "valid123Password@",
    };

    const mockResponse = new Response(new IncomingMessage(new Socket()));

    const { mutate } = await testClient({
      req: { headers: {} },
      res: mockResponse,
    });

    const register = await mutate({
      mutation: userRegisterMutationGQL,
      variables: {
        data: registerValues,
      },
    });

    const loginResponse = await mutate({
      mutation: userAuthenticateMutationGQL,
      variables: {
        email: registerValues.email,
        password: registerValues.password,
      },
    });

    const server = CorejamServer();
    const mockContext = () => ({
      ...server.context({
        req: {
          headers: {
            authorization: loginResponse.data.userAuthenticate.token,
          },
        },
        res: {},
      }),
      notify: Notify,
    });

    //Make a request with token in header
    const authClient = await testClient(
      {
        //TODO fix typings, we actually set the headers in context above
        //so we dont need to insert them here again
        req: {
          headers: {
            authorization: loginResponse.data.userAuthenticate.token,
          },
        },
        res: new Response(new IncomingMessage(new Socket())),
      },
      mockContext
    );

    const updatePasswordRequest = await authClient.mutate({
      mutation: userUpdatePasswordMutationGQL,
      variables: {
        userPasswordInput: updatePassword,
      },
    });

    expect(updatePasswordRequest.data.userUpdatePassword).toBe(true);

    expect(Notify.sendMail).toBeCalledTimes(1);

    const context = mockContext() as MergedServerContext;
    const user = (await context.models.userById(register.data.userRegister.id)) as UserDB;
    expect(Notify.sendMail).toBeCalledWith(new PasswordResetConfirmed(user));

    const loginResponse2 = await (await testClient()).mutate({
      mutation: userAuthenticateMutationGQL,
      variables: {
        email: registerValues.email,
        password: registerValues.password,
      },
    });

    expect(loginResponse2.errors[0]).toEqual(new AuthenticationError());
  });

  it("Expect register verify email to be sent", async () => {
    const newValues: RegisterInput = {
      email: faker.internet.email(),
      password: "valid123Password@",
      passwordConfirm: "valid123Password@",
    };

    const mockResponse = new Response(new IncomingMessage(new Socket()));

    const server = CorejamServer();
    const mockContext = () => ({
      ...server.context({ req: {}, res: {} }),
      notify: Notify,
    });

    const { mutate } = await testClient(
      {
        req: { headers: {} },
        res: mockResponse,
      },
      mockContext
    );

    const register = await mutate({
      mutation: userRegisterMutationGQL,
      variables: {
        data: newValues,
      },
    });

    const context = mockContext() as MergedServerContext;
    const user = (await context.models.userById(register.data.userRegister.id)) as UserDB;

    expect(Notify.sendMail).toBeCalledTimes(1);
    expect(Notify.sendMail).toBeCalledWith(new RegisterVerifyMail(user));
  });

  it("Can verify newly registered user", async () => {
    const newUser: RegisterInput = {
      email: faker.internet.email(),
      password: "valid123Password@",
      passwordConfirm: "valid123Password@",
    };

    const { mutate, models } = await testClient();

    await mutate({
      mutation: userRegisterMutationGQL,
      variables: {
        data: newUser,
      },
    });

    const user = (await models.userByEmail(newUser.email)) as UserDB;
    expect(user).toHaveProperty("verifyHash");
    expect(user.status).toBe(STATUS.PENDING);

    const failedVerifyToken = await mutate({
      mutation: verifyEmailGQL,
      variables: {
        email: user.email,
        token: "staticWrongToken",
      },
    });

    expect(failedVerifyToken.errors[0]).toEqual(new InvalidVerificationError());

    const failedVerifyEmail = await mutate({
      mutation: verifyEmailGQL,
      variables: {
        email: "random@email.com",
        token: "staticWrongToken",
      },
    });

    expect(failedVerifyEmail.errors[0]).toEqual(new InvalidEmailError());

    const verify = (
      await mutate({
        mutation: verifyEmailGQL,
        variables: {
          email: user.email,
          token: user.verifyHash,
        },
      })
    ).data.userVerify;

    expect(verify.status).toBe(STATUS.VERIFIED);
  });

  it("Can reset password", async () => {
    const newUser: RegisterInput = {
      email: faker.internet.email(),
      password: "valid123Password@",
      passwordConfirm: "valid123Password@",
    };

    const { mutate, models } = await testClient();

    await mutate({
      mutation: userRegisterMutationGQL,
      variables: {
        data: newUser,
      },
    });

    /**
     * request password reset
     * expect password reset email to be sent
     *
     * expect user.authReset to not be null
     */
    const server = CorejamServer();
    const mockContext = () => ({
      ...server.context({
        req: {},
        res: {},
      }),
      notify: Notify,
    });

    const contextClient = await testClient(
      {
        req: { headers: {} },
        res: new Response(new IncomingMessage(new Socket())),
      },
      mockContext
    );

    const requestReset = await contextClient.mutate({
      mutation: requestPasswordResetGQL,
      variables: {
        email: newUser.email,
      },
    });

    expect(requestReset.data.userRequestPasswordReset).toBe(true);
    expect(Notify.sendMail).toBeCalledTimes(1);

    const userByEmail = (await models.userByEmail(newUser.email)) as UserDB;
    expect(userByEmail.authReset).toBeDefined();

    //@ts-ignore we are accessing a mock
    const requestResultToken = Notify.sendMail.mock.calls[0][0].token;

    /**
     * Expect to be able to use token to reset the password
     * expect the user object to no longer have user.authReset
     * expect to no longer be able to login with old password
     * expect to be able to login with new password
     */
    const newPassword = "valid543Password@";
    const resetReq = await contextClient.mutate({
      mutation: passwordResetGQL,
      variables: {
        token: requestResultToken,
        resetInput: {
          password: newPassword,
          passwordConfirm: newPassword,
        },
      },
    });

    expect(resetReq.data.userResetPassword).toBe(true);
    expect(Notify.sendMail).toBeCalledTimes(2);

    //Test login with old password
    const loginOldResponse = await mutate({
      mutation: userAuthenticateMutationGQL,
      variables: {
        email: newUser.email,
        password: newUser.password,
      },
    });

    expect(loginOldResponse.errors[0]).toEqual(new AuthenticationError());

    //Test new password
    const loginResponse = await mutate({
      mutation: userAuthenticateMutationGQL,
      variables: {
        email: newUser.email,
        password: newPassword,
      },
    });

    expect(loginResponse.data.userAuthenticate).toHaveProperty("user.email");
    expect(loginResponse.data.userAuthenticate).toHaveProperty("token");
  });
});
