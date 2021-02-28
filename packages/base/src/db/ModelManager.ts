import { ModelMeta } from "../typings/DB";
import { CoreModel } from "./CoreModel";

export const modelMeta = new Map<String, { [key: string]: ModelMeta }>();

/**
 * Model meta store used as singleton source 
 * of meta information for our models.
 */
export function getModelMeta<T extends CoreModel>(model: T) {
    return modelMeta.get(model.getModelName())
}