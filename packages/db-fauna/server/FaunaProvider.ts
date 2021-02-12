import { CoreModel } from "@corejam/base/dist/db/CoreModel";
import { ProviderInterface } from "@corejam/base/dist/db/ProviderInterface"
import * as faunadb from 'faunadb';

const q = faunadb.query

const client = new faunadb.Client({
    secret: process.env.FAUNA_SECRET as string,
})

type FaunaDocument = {
    ref: any,
    ts: BigInt,
    data: object
}

/**
 * FaunaDB integration for Corejam
 */
export class FaunaProvider implements ProviderInterface {

    async create<Model extends CoreModel>(model: Model): Promise<Model> {

        const created: any = await client.query(
            q.Create(
                q.Collection(model.getModelName()), {
                data: { ...model.getData() }
            })
        );

        model.id = created.ref.id;

        return model
    }

    async read<Model extends CoreModel>(model: Model, id: string | number): Promise<Model | null> {
        try {
            const item: FaunaDocument = await client.query(
                q.Get(
                    q.Ref(q.Collection(model.getModelName()), id)
                )
            )

            model.assignData(item.data);

            return model
        }
        catch (e) {
            return null
        }
    }

    async update<Model extends CoreModel>(model: Model): Promise<Model> {
        await client.query(
            q.Update(q.Ref(q.Collection(model.getModelName()), model.id), {
                data: { ...model.getData() }
            })
        )

        return model;
    }


    async delete<Model extends CoreModel>(model: Model): Promise<Boolean> {
        const deleteRequest = await client.query(
            q.Delete(
                q.Ref(
                    q.Collection(model.getModelName()
                    ), model.id as string)
            )
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