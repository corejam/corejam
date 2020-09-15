import { ServerContext } from "@corejam/base/dist/typings/Server";
import { CoreResolver } from "@corejam/base/dist/typings/CoreResolver";
import { JWT, RegisterInput, UserCreateInput, UserDB, UserInput } from "./User";

/**
 * We are adding these resolvers to the existing CoreResolver
 */
export declare type PluginResolver = {
  allUsers(): Promise<UserDB[]>;
  userCreate(userCreateInput: UserCreateInput): Promise<UserDB>;
  userRegister(userInput: RegisterInput): Promise<UserDB>;
  userEdit(id: string, userInput: UserInput): Promise<UserDB>;
  userById(id: string): Promise<UserDB | null>;
  userByToken(token: string): Promise<UserDB | null>;
  userByEmail(email: string): Promise<UserDB | null>;
  userAuthenticate(email: string, password: string): Promise<JWT>;
  userTokenRefresh(refreshToken: string): Promise<JWT>;
};

export declare type MergedServerResolver = CoreResolver & PluginResolver;

/**
 * We are adding an optional user to the core context if we have it.
 * Merge with exisiting ServerContext
 */
export declare type PluginServerContext = {
  user: () => Promise<UserDB>;
};

/**
 * Override models to include our Plugin resolver
 */
export declare type MergedServerContext = Partial<ServerContext> &
  PluginServerContext & {
    models: MergedServerResolver;
  };
