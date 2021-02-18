import { MergedServerContext } from "../../shared/types/PluginResolver";
import * as Resolvers from "./Resolvers"

/**
 * Anything that this plugin offers to the server context is retrieved here
 */
export function getPluginContext({ req, models }): MergedServerContext {
  //Merge models
  models = {
    ...models,
    ...Resolvers,
  };

  const user = async () => (req.headers.authorization ? await models.userByToken(req.headers.authorization) : null);

  return { user, models } as MergedServerContext;
}
