import { ProviderInterface } from "@corejam/base/dist/db/ProviderInterface"
import { DBDocument } from "@corejam/base/dist/typings/DB";

export class FaunaProvider implements ProviderInterface {

    create(_document: object): Promise<DBDocument> {
        throw new Error("Method not implemented.");
    }
    read(_id: string | number): Promise<DBDocument> {
        throw new Error("Method not implemented.");
    }
    update(_document: DBDocument): Promise<DBDocument> {
        throw new Error("Method not implemented.");
    }
    delete(_document: DBDocument): Promise<Boolean> {
        throw new Error("Method not implemented.");
    }
    count(): Promise<number> {
        throw new Error("Method not implemented.");
    }
    createIndex(_name: string, _options?: any): Promise<Boolean> {
        throw new Error("Method not implemented.");
    }
    deleteIndex(_name: string): Promise<Boolean> {
        throw new Error("Method not implemented.");
    }
    
}