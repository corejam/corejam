import { getServerContext } from "@corejam/base/dist/Server";
import { User } from "../server/Models/User";
import {
    generateUser
} from "../server/resolvers/db/faker/Generator";

export default async () => {
    const { models } = (await getServerContext({ req: { headers: {} }, res: {} })) as MergedServerContext;

    for (let index = 0; index < 10; index++) {
        new User().assignData({
            ...generateUser(),
        }).save();
    }

    //We want a test account
    models.userRegister({
        email: "test@test.com",
        password: "valid123Password@",
        passwordConfirm: "valid123Password@",
    }).then((user) => {
        user.role = [User.ROLES.ADMIN];
        user.save();
    });
}