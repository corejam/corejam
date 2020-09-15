import { MergedServerContext } from "../../shared/types/PluginResolver";
import { models as faunaModels } from "./db/fauna";
import { models as fakerModels } from "./db/faker";

let pluginModels;

if (process.env.DB_DRIVER === "DB_FAUNA") {
  pluginModels = faunaModels;
} else {
  pluginModels = fakerModels;
}

/**
 * Anything that this plugin offers to the server context is retrieved here
 */
export async function getPluginContext({ req, models }): Promise<MergedServerContext> {
  //Merge models
  models = {
    ...models,
    ...pluginModels,
  };

  const user = async () => (req.headers.authorization ? await models.userByToken(req.headers.authorization) : null);

  return { user, models };
}
