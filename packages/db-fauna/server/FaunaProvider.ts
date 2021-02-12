import { CoreModel } from "@corejam/base/dist/db/CoreModel";
import { ProviderInterface } from "@corejam/base/dist/db/ProviderInterface"
import * as faunadb from 'faunadb';

const q = faunadb.query

const client = new faunadb.Client({
    secret: process.env.FAUNA_SECRET as string,
})

/**
 * FaunaDB integration for Corejam
 */
export class FaunaProvider implements ProviderInterface {

    async create(model: CoreModel): Promise<CoreModel> {

        const created: any = await client.query(
            q.Create(
                q.Collection(model.getModelName()), {
                data: { ...model.getData() }
            })
        );

        model.id = created.ref.id;

        return model
    }

    async read(model: CoreModel, id: string | number): Promise<CoreModel | null> {
        try {
            const item = await client.query(
                q.Get(
                    q.Ref(q.Collection(model.getModelName()), id)
                )
            )

            model.assignData(item);

            return model
        }
        catch (e) {
            return null
        }
    }

    async update(model: CoreModel): Promise<CoreModel> {
        await client.query(
            q.Update(q.Ref(q.Collection(model.getModelName()), model.id), {
                data: { ...model.getData() }
            })
        )

        return model;
    }


    async delete(model: CoreModel): Promise<Boolean> {
        const deleteRequest = await client.query(
            q.Delete(model.id as faunadb.ExprArg)
        )

        delete model.id;
        model.getDataFields().map(field => {
            delete model[field]
        })

        return deleteRequest instanceof Object;
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