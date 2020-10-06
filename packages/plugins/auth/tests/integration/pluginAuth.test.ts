import * as faker from "faker";
import { IncomingMessage, ServerResponse } from "http";
import { Socket } from "net";
import * as sinon from "ts-sinon";
import { AccountExistsError, AuthenticationError } from "../../server/Errors";
import {
  userAuthenticateMutationGQL,
  userEditMutationGQL,
  userRegisterMutationGQL
} from "../../shared/graphql/Mutations";
import { userByTokenGQL } from "../../shared/graphql/Queries";
import { RegisterInput, UserCreateInput, UserDB, UserInput } from "../../shared/types/User";

//@ts-ignore
import { testClient } from "../../src/TestClient";
//@ts-ignore
import { eventEmitter } from "../../__LINKEDPKGS__/base/src/Server";

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

  it("getUserById", async () => {
    //Test that we can retrieve the same values back
    const returnedUserById = await models.userById(testID);
    expect(returnedUserById).toEqual(expect.objectContaining(testValues));
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

  it("updateUser", async () => {
    const newValues: UserInput = {
      active: false,
      email: faker.internet.email(),
    };

    const editResult = await models.userEdit(testID, newValues);

    expect(editResult).toEqual(expect.objectContaining(newValues));
  });

  it("registerUserAndAuth", async () => {
    const newValues: RegisterInput = {
      email: faker.internet.email(),
      password: "valid123Password@",
      passwordConfirm: "valid123Password@",
    };

    const mockResponse = new ServerResponse(new IncomingMessage(new Socket()));

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
    expect(mockResponse.getHeaders()["set-cookie"]?.toString().indexOf("refreshToken")).toBe(0);

    //We should have a loggedIn event emitted
    expect(spy.called).toBe(true);
    expect(spy.calledOnce).toBe(true);
    expect(spy.calledWith({ user: newValues.email })).toBe(true);

    //Make a request with token in header
    const authClient = await testClient({
      req: {
        headers: {
          authorization: loginResponse.data.userAuthenticate.token,
        },
      },
      res: new ServerResponse(new IncomingMessage(new Socket())),
    });

    const { query } = authClient;

    const userByTokenResponse = await query({
      query: userByTokenGQL,
    });

    expect(userByTokenResponse.data.userByToken).toEqual(expect.objectContaining({
      email: newValues.email,
      id: registerResponse.data.userRegister.id
    }));

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
});
