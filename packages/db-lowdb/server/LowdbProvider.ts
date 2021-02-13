import { CoreModel } from "@corejam/base/dist/db/CoreModel";
import { ProviderInterface } from "@corejam/base/dist/db/ProviderInterface";
import { ID } from "@corejam/base/dist/typings/DB";
import * as lowdb from "lowdb";
import * as FileSync from "lowdb/adapters/FileSync";
import { nanoid } from "nanoid";

/**
 * Our schemas are made up of keys that hold arrays of objects
 */
interface Schema {
    [key: string]: { id: ID } & object[]
}

//@ts-ignore the lowdb types are messed up. Need to fix 
const adapter = new FileSync<Schema>(process.cwd() + '/.corejam/db.json')
//@ts-ignore
const db = lowdb(adapter)

export class LowdbProvider implements ProviderInterface {

    async create<Model extends CoreModel>(model: Model): Promise<Model> {
        model.id = nanoid();

        await db.get(model.getModelName()).push({
            id: model.id,
            ...model.getData()
        }).write()

        return model;
    }

    async read<Model extends CoreModel>(model: Model, id: string | number): Promise<Model | null> {
        const item = db.get(model.getModelName()).find({
            id
        }).value()

        if (!item) return new Promise((res) => res);

        return new Promise((res) => res(model.assignData(item)))
    }

    async update<Model extends CoreModel>(model: Model): Promise<Model> {
        const item = db.get(model.getModelName()).find({ id: model.id })

        await item.assign({
            ...item.value(),
            ...model.getData()
        }).write()

        return model;
    }

    async delete<Model extends CoreModel>(model: Model): Promise<Boolean> {
        await db.get(model.getModelName()).remove({ id: model.id }).write()

        return true //This should be a better check
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