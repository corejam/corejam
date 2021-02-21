import { CoreModel } from "../CoreModel";

export class DocumentNotFound extends Error {
    
    constructor(model: CoreModel) {
        super();
        this.message = `${model.getModelName()} with ID ${model.id} not found`;
    }
}