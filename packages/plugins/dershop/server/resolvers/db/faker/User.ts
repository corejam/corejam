import { UserDB, RegisterInput } from "../../../../shared/types/User";
import { random } from "faker";
import { hashPassword } from "@corejam/plugin-auth/dist/server/Functions";
import { roles } from "@corejam/plugin-auth/dist/shared/types/User";
import { updateDates } from "@corejam/base/dist/Functions";
import { users, userEdit } from "@corejam/plugin-auth/dist/server/resolvers/db/faker/User";

export async function userRegister(userInput: RegisterInput): Promise<UserDB> {
    const userObj: UserDB = {
        id: random.uuid(),
        email: userInput.email,
        firstName: userInput.firstName,
        lastName: userInput.lastName,
        password: await hashPassword(userInput.password),
        active: true,
        role: [roles.USER],
        ...updateDates(),
    };

    users.push(userObj);

    return userObj;
}

//We want a test account
userRegister({
    firstName: "test",
    lastName: "account",
    email: "test@test.com",
    password: "valid123Password@",
    passwordConfirm: "valid123Password@",
}).then((user) => {
    userEdit(user.id, { role: [roles.ADMIN] });
});