import "reflect-metadata";
import { CoreModel } from "./CoreModel";

/**
 * This is our decorator for defining fields that will be accessible
 * to the DBProvider through the model.
 */
export function Coredata<T extends CoreModel>(
  { unique = false, index = false, relation = null }: { unique?: Boolean; index?: Boolean; relation?: any } = {
    index: false,
    unique: false,
  }
) {
  return (target: T, key: string) => {
    const metaData = Reflect.getMetadata("Corejam", target) || [];

    if (!(target.constructor.name in metaData)) {
      metaData[target.constructor.name] = [];
    }

    if (!(key in metaData[target.constructor.name])) {
      metaData[target.constructor.name][key] = {
        unique,
        index,
        relation,
      };
    }

    Reflect.defineMetadata("Corejam", metaData, target);
  };
}

/**
 * This decorator can be used to like the Coredata decorator but
 * any fields declared as `@Corejam` will automatically be merged
 * into the GraphQL schema to query.
 *
 */
export function Corejam<T extends CoreModel>(
  { unique = false, index = false, relation = null }: { unique?: Boolean; index?: Boolean; relation?: any } = {
    index: false,
    unique: false,
  }
) {
  return Coredata<T>({ unique, index, relation });
}
