import "reflect-metadata";

/**
 * This is our decorator for defining fields that will be accessible
 * to the DBProvider through the model.
 */
export function CoreData(): PropertyDecorator {
  return (target, key) => {
    const fields = Reflect.getOwnMetadata("CoreData", target) || [];
    if (!fields.includes(key)) {
      fields.push(key);
    }
    Reflect.defineMetadata("CoreData", fields, target);
  };
}

/**
 * This decorator can be used to like the CoreData decorator but
 * any fields declared as `@Corejam` will automatically be merged
 * into the GraphQL schema.
 */
export function Corejam(): PropertyDecorator {
  return (target, key) => {
    const fields = Reflect.getOwnMetadata("Corejam", target) || [];
    if (!fields.includes(key)) {
      fields.push(key);
    }
    Reflect.defineMetadata("Corejam", fields, target);
  };
}
