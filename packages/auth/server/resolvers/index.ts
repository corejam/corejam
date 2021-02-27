import { AuthenticationError } from "../Errors";
import { MergedServerContext } from "../types/PluginResolver";
import * as Resolvers from "./Resolvers";

/**
 * Anything that this plugin offers to the server context is retrieved here
 */
export function getPluginContext({ req, models }): MergedServerContext {
  //Merge models
  models = {
    ...models,
    ...Resolvers,
  };

  const user = async () => {
    if (req.headers.authorization)
      return await models.userByToken(req.headers.authorization)

    throw new AuthenticationError()
  }

  return { user, models } as MergedServerContext;
}
