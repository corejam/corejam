import { CoreModel } from "./CoreModel";
import { ParsedRelation, Relation } from "./Relation";

export class RelationOne extends Relation {
  relation: CoreModel;

  constructor(model: CoreModel) {
    super(model);
    this.relation = model;
  }

  parse(): ParsedRelation {
    return {
      id: this.relation.id,
      relation: this.relation.constructor.name,
    };
  }
}
