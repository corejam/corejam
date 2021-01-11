import { updateDates } from "@corejam/base";
import { FaunaClient } from "@corejam/base/dist/resolvers/db/fauna/Client";
import { query as q } from "faunadb";
import { AuthenticationError } from "../../../Errors";
import { decodeJWT, generateTokensForUser } from "../../../Functions";
import { JWT, RegisterInput, UpdatePasswordInput, UserCreateInput, roles, STATUS, UserDB, UserInput } from "../../../../shared/types/User";

export function allUsers(): Promise<UserDB[]> {
  return FaunaClient()
    .query(
      q.Map(
        q.Paginate(q.Match(q.Index("allUsers"))),
        q.Lambda("x", q.Merge({ id: q.Select(["ref", "id"], q.Get(q.Var("x"))) }, q.Select("data", q.Get(q.Var("x")))))
      )
    )
    .then((response: any) => {
      return response.data;
    });
}

export function userCreate(userCreateInput: UserCreateInput): Promise<UserDB> {
  return FaunaClient()
    .query(
      q.Create(q.Collection("users"), {
        data: {
          email: userCreateInput.email,
          role: [roles.USER],
          active: true,
          status: STATUS.PENDING,
          ...updateDates(),
        },
        credentials: { password: userCreateInput.password },
      })
    )
    .then((response: any) => {
      return {
        id: response.ref.id,
        ...response.data,
      };
    });
}

export function userEdit(id: string, userInput: UserInput): Promise<UserDB> {
  return FaunaClient()
    .query(
      q.Update(q.Ref(q.Collection("users"), id), {
        data: {
          ...userInput,
        },
      })
    )
    .then((response: any) => {
      return {
        id: response.ref.id,
        ...response.data,
      };
    });
}

export function userById(id: string): Promise<UserDB | null> {
  return FaunaClient()
    .query(q.Get(q.Ref(q.Collection("users"), id)))
    .then((response: any) => {
      return {
        id: response.ref.id,
        ...response.data,
      };
    });
}

export function userByToken(token: string): Promise<UserDB | null> {
  const decoded = decodeJWT(token);
  return userById(decoded.id);
}

export function userByEmail(email: string): Promise<UserDB | null> {
  return FaunaClient()
    .query(q.Get(q.Match(q.Index("userByEmail"), email)))
    .then((response: any) => {
      return {
        id: response.ref.id,
        ...response.data,
      };
    })
    .catch((e: Error) => {
      if (e.message == "instance not found") return null;

      throw e;
    });
}

export async function userRegister(userInput: RegisterInput, _id?: string): Promise<UserDB> {
  return userCreate((userInput as unknown) as UserCreateInput);
}

export function userAuthenticate(email: string, password: string): Promise<JWT> {
  return FaunaClient()
    .query(
      q.Merge(q.Login(q.Match("userByEmail", email), { password: password }), {
        user: q.Select(["data"], q.Get(q.Match("userByEmail", email))),
      })
    )
    .then((response: any) => {
      if (!response.user.active) {
        throw new AuthenticationError();
      }

      const user = {
        ...response.user,
        id: response.instance.id,
      };

      return generateTokensForUser(user, userEdit);
    })
    .catch((_e) => {
      throw new AuthenticationError();
    });
}

export async function userTokenRefresh(refreshToken: string): Promise<JWT> {
  const decodedRefresh = decodeJWT(refreshToken);
  const user = await userById(decodedRefresh.id);

  if (!user || !user.refreshToken) {
    throw new AuthenticationError();
  }

  return await generateTokensForUser(user, userEdit);
}

export async function userUpdatePassword(user: UserDB, passwordInput: UpdatePasswordInput): Promise<Boolean> {
  return FaunaClient()
    .query(
      q.Update(q.Ref(q.Collection("users"), user.id), {
        credentials: { password: passwordInput.password }
      })
    ).then((_res: any) => {
      return true
    })
}