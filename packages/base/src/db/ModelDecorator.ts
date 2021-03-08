import "reflect-metadata";
import { CoreModel } from "./CoreModel";

/**
 * This is our decorator for defining fields that will be accessible
 * to the DBProvider through the model.
 */
export function Coredata<T extends CoreModel>(
  { unique = false, index = false }: { unique?: Boolean; index?: Boolean } = { index: false, unique: false }
) {
  return (target: T, key: string) => {
    const type = Reflect.getMetadata("design:type", target, key);
    const fields = Reflect.getMetadata("Corejam", target) || [];

    if (!fields.includes(key)) {
      fields[key] = {
        unique,
        index,
        type: type.name,
      };
    }

    Reflect.defineMetadata("Corejam", fields, target);
  };
}

/**
 * This decorator can be used to like the Coredata decorator but
 * any fields declared as `@Corejam` will automatically be merged
 * into the GraphQL schema to query.
 *
 */
export function Corejam<T extends CoreModel>(
  { unique = false, index = false }: { unique?: Boolean; index?: Boolean } = { index: false, unique: false }
) {
  return Coredata<T>({ unique, index });
}
