import * as resolvers from "./resolvers/Auth";
import User from "./Models/User";
import { generateUser } from "./resolvers/db/faker/Generator";
import { userRegister } from "./resolvers/Resolvers";
import { getPluginContext } from "./resolvers";

const pluginProperties = {
  resolvers,
  context: getPluginContext,
  init: () => {
    if (process.env.FAKER_MODULE === "auth") {
      for (let index = 0; index < 10; index++) {
        new User().assignData({
          ...generateUser(),
        }).save();
      }

      //We want a test account
      userRegister({
        email: "test@test.com",
        password: "valid123Password@",
        passwordConfirm: "valid123Password@",
      }).then((user) => {
        user.role = [User.ROLES.ADMIN];
        user.save();
      });
    }
  },
  schemas: ["auth"],
};

export default pluginProperties;
