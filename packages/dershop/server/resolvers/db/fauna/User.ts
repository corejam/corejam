import { updateDates } from "@corejam/base/dist/Functions";
import { FaunaClient } from "@corejam/base/dist/resolvers/db/fauna/Client";
import { roles } from "@corejam/plugin-auth/dist/shared/types/User";
import { query as q } from "faunadb";
import { RegisterInput, UserCreateInput, UserDB } from "../../../../shared/types/User";

export function userCreate(userCreateInput: UserCreateInput): Promise<UserDB> {
    return FaunaClient()
        .query(
            q.Create(q.Collection("users"), {
                data: {
                    email: userCreateInput.email,
                    firstName: userCreateInput.firstName,
                    lastName: userCreateInput.lastName,
                    role: [roles.USER],
                    active: true,
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

export async function userRegister(userInput: RegisterInput, _id?: string): Promise<UserDB> {
    return userCreate({ ...userInput, active: true });
}
