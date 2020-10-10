import { PluginResolver } from "../../../../shared/types/PluginResolver";

import {
  allUsers,
  userRegister,
  userAuthenticate,
  userByEmail,
  userById,
  userByToken,
  userCreate,
  userEdit,
  userTokenRefresh,
  userUpdatePassword,
} from "./User";

export const models: PluginResolver = {
  allUsers,
  userRegister,
  userAuthenticate,
  userByEmail,
  userById,
  userByToken,
  userCreate,
  userEdit,
  userTokenRefresh,
  userUpdatePassword
};
