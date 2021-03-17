import { ID } from "../typings/DB";
import { CoreModel } from "./CoreModel";
import { ParsedRelation, Relation } from "./Relation";

export class RelationMany extends Relation {
  relations: ID[];

  constructor(model: CoreModel, relations: [CoreModel]) {
    super(model);

    if (!relations.length) throw new Error("Empty relations");

    this.relations = relations.map((model) => model.id);
  }

  parse(): ParsedRelation | ParsedRelation[] {
    throw new Error("Method not implemented.");
  }
}
