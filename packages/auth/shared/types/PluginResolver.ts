import { CoreResolver } from "@corejam/base/dist/typings/CoreResolver";
import { ServerContext } from "@corejam/base/dist/typings/Server";
import { ID } from "@corejam/base/dist/typings/DB"
import { PluginServerContext as NotifyContext } from "@corejam/notify/dist/server/types/PluginResolver";
import { JWT, RegisterInput, UpdatePasswordInput, User, UserCreateInput, UserInput } from "./User";

/**
 * We are adding these resolvers to the existing CoreResolver
 */
export declare type PluginResolver = {
  allUsers(): Promise<User[]>;
  userCreate(userCreateInput: UserCreateInput): Promise<User>;
  userRegister(userInput: RegisterInput): Promise<User>;
  userEdit(id: ID, userInput: UserInput): Promise<User>;
  userById(id: ID): Promise<User | null>;
  userByToken(token: string): Promise<User | null>;
  userByEmail(email: string): Promise<User | null>;
  userAuthenticate(email: string, password: string): Promise<JWT>;
  userTokenRefresh(refreshToken: string): Promise<JWT>;
  userUpdatePassword(user: User, passwordInput: UpdatePasswordInput): Promise<Boolean>;
};

export declare type MergedServerResolver = CoreResolver & PluginResolver;

/**
 * We are adding an optional user to the core context if we have it.
 * Merge with exisiting ServerContext
 */
export declare type PluginServerContext = {
  user: () => Promise<User>;
};

/**
 * Override models to include our Plugin resolver
 */
export declare type MergedServerContext = Partial<ServerContext> &
  NotifyContext &
  PluginServerContext & {
    models: MergedServerResolver;
  };
