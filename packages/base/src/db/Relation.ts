import { ID } from "../typings/DB";
import { CoreModel } from "./CoreModel";

export type ParsedRelation = {
  relation: string;
  id: ID;
};

/**
 * Defines a relationship to another document in a collection.
 */
export abstract class Relation {
  relatedClass: string;

  constructor(model: CoreModel) {
    this.relatedClass = model.constructor.name;
  }

  abstract parse(): ParsedRelation | ParsedRelation[];
}
