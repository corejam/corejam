import { ID } from "../typings/DB";
import { CoreModel } from "./CoreModel";

export type ParsedRelation = {
  id: ID;
};

/**
 * Defines a relationship to another document in a collection.
 */
export class Relation {
  relations: CoreModel | CoreModel[];

  constructor(relatedModels: CoreModel | CoreModel[]) {
    this.relations = relatedModels
  }

  /**
   * The output that gets stored in the db
   */
  public parse(): ParsedRelation | ParsedRelation[] {
    if (Array.isArray(this.relations) && this.relations.length) {
      return this.relations.map(relation => {
        this.checkValid(relation)

        return { id: relation.id as ID }
      })
    } else if (this.relations instanceof CoreModel) {
      this.checkValid(this.relations)
      return { id: this.relations.id as ID }
    }

    throw Error("Relation not defined")
  }

  checkValid(model: CoreModel) {
    if (!model.exists()) throw Error("Relation hasn't been saved yet");
  }
}
