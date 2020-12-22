import Response from "@corejam/base/src/Response";
import { CorejamServer, eventEmitter } from "@corejam/base/src/Server";
import { testClient } from "@corejam/base/src/TestClient";
import * as OriginalNotify from "@corejam/notify/server/Notify";
import * as faker from "faker";
import { IncomingMessage } from "http";
import { Socket } from "net";
import * as sinon from "ts-sinon";
import { AccountExistsError, AuthenticationError } from "../../server/Errors";
import RegisterVerifyMail from "../../server/mail/RegisterVerify";
import {
  meGQL,
  userAuthenticateMutationGQL,
  userEditMutationGQL,
  userRegisterMutationGQL,
  userTokenRefreshMutationGQL
} from "../../shared/graphql/Mutations";
import { paginateUsersGQL } from "../../shared/graphql/Queries";
import { RegisterInput, UserCreateInput, UserDB, UserInput, UserList } from "../../shared/types/User";

jest.mock("@corejam/notify/server/Notify")
const MockedNotify = OriginalNotify as jest.Mocked<typeof OriginalNotify>
const Notify = new MockedNotify.default;

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

        expect(item).toEqual(expect.objectContaining({
          email: testUSer.email,
          active: testUSer.active
        }));
      }
    });
  });

  it("Paginated users", async () => {
    const { query } = client

    //Test that we can retrieve the same values back
    const pagination = await query({
      query: paginateUsersGQL,
      variables: { page: 1, size: 24 }
    })

    const paginated: UserList = pagination.data.paginateUsers;
    expect(paginated.currentPage).toEqual(1)
    expect(paginated.items.length).toEqual((await models.allUsers()).length)
  });

  it("updateUser", async () => {
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
    const cookie = mockResponse.getHeaders()["set-cookie"]
    expect(cookie).toContain("refreshToken");

    //We should have a loggedIn event emitted
    expect(spy.called).toBe(true);
    expect(spy.calledOnce).toBe(true);
    expect(spy.calledWith({ user: newValues.email })).toBe(true);

    //Make a request with token in header
    const authResponse = new Response(new IncomingMessage(new Socket()))
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
    expect(meResponse.data.me.email).toEqual(newValues.email)

    const cookieResponseHeaders = new Response(new IncomingMessage(new Socket()))
    const { mutate: cookieMutate } = await testClient({
      req: {
        headers: {
          cookie: `refreshToken=${loginResponse.data.userAuthenticate.token}`
        },
      },
      res: cookieResponseHeaders,
    });

    //Refresh token
    await cookieMutate({
      mutation: userTokenRefreshMutationGQL,
    });

    //Expect refreshToken cookie to have been set in headers
    const headers = cookieResponseHeaders.getHeaders()
    const refreshedCookie = headers["set-cookie"]
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

  it("Expect register verify email to be sent", async () => {
    const newValues: RegisterInput = {
      email: faker.internet.email(),
      password: "valid123Password@",
      passwordConfirm: "valid123Password@",
    };

    const mockResponse = new Response(new IncomingMessage(new Socket()));

    const server = CorejamServer()
    const mockContext = () => ({
      ...server.context({ req: {}, res: {} }),
      notify: Notify
    })

    const { mutate } = await testClient({
      req: { headers: {} },
      res: mockResponse,
    }, mockContext);

    await mutate({
      mutation: userRegisterMutationGQL,
      variables: {
        data: newValues,
      },
    });

    expect(Notify.sendMail).toBeCalledTimes(1)
    expect(Notify.sendMail).toBeCalledWith(new RegisterVerifyMail({
      email: newValues.email
    } as UserDB))
  })
});
