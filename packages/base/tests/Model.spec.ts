import { createTypeFromModel } from "../src/db/ModelHelper"

const read = jest.fn();
const save = jest.fn();
const filter = jest.fn();
const list = jest.fn();
const create = jest.fn();
const update = jest.fn();
const deleteFn = jest.fn();

/**
 * Mock the getDb function in plugin manager so we
 * can assert the individual functions are called on our model
 */
jest.mock("../src/PluginManager", () => ({
    getDb: () => ({
        read,
        save,
        filter,
        list,
        create,
        update,
        delete: deleteFn
    })
}))

import TestObject from "./dbInterface/TestObject";
import TestObject2 from "./dbInterface/TestObject2";

describe(`Base Model tests`, () => {

    it("Validate getDataFields only has our decorated attributes", async () => {
        const testObject = new TestObject();

        expect(testObject.getDataFields()).toEqual([
            "dataAttribute1",
            "dataAttribute2",
            "uniqueAttribute",
            "intAttribute"
        ])
    });

    it("Validate getData only returns our decorated data", async () => {
        const testObject = new TestObject();

        expect(testObject.getData()).toEqual({
            dataAttribute1: "attribute1",
            dataAttribute2: "attribute2",
            uniqueAttribute: "unique-value"
        })

        //Change a value
        testObject.dataAttribute1 = "new value"

        expect(testObject.getData()).toEqual({
            dataAttribute1: "new value",
            dataAttribute2: "attribute2",
            uniqueAttribute: "unique-value"
        })
    });

    it("assignDate correctly sets attributes", async () => {
        const testObject = new TestObject();
        testObject.assignData({
            dataAttribute1: "test value 123",
            dataAttribute2: "test attribute again"
        })

        expect(testObject.dataAttribute1).toEqual("test value 123")
        expect(testObject.dataAttribute2).toEqual("test attribute again")

        const testObjectWithid = new TestObject();
        testObjectWithid.assignData({
            id: 1,
            dataAttribute1: "test value 123",
            dataAttribute2: "test attribute again"
        })
        expect(testObjectWithid.id).toEqual(1)
    });

    it("DBProvider is called correctly", async () => {
        const testObject = new TestObject();
        testObject.save();

        //First we call create
        expect(create).toHaveBeenCalledWith(testObject)

        //On the second call we want it to exist
        jest.spyOn(testObject, "exists")
            .mockImplementation(() => testObject.exists())
            .mockImplementationOnce(() => true)

        //Second time we call update
        testObject.save()
        expect(update).toHaveBeenCalledWith(testObject)

        TestObject.getById(1);
        const readObject = new TestObject;
        readObject.id = 1;
        expect(read).toHaveBeenCalledWith(readObject, 1)

        testObject.delete()
        expect(deleteFn).toHaveBeenCalledWith(testObject)

        expect(testObject.getModelName()).toEqual(testObject.collection)

        TestObject.filter({});
        expect(filter).toHaveBeenCalled()

        TestObject.list();
        expect(list).toHaveBeenCalled()

    })

    it("Check meta data", async () => {
        const testObject = new TestObject();

        expect(testObject.getMeta()).toEqual({
            dataAttribute1: { unique: false, index: false, type: "String" },
            dataAttribute2: { unique: false, index: false, type: "String" },
            uniqueAttribute: { unique: true, index: false, type: "String" },
            intAttribute: { unique: false, index: false, type: "Number" }
        })

        const testObject2 = new TestObject2();
        expect(testObject2.getMeta()).toEqual(
            { otherAttribute: { index: false, unique: false, type: "Boolean" } }
        )
    })

    it("Test type generation is working correctly", async () => {
        const testObject = new TestObject();
        const type = createTypeFromModel(testObject)

        expect(type).toEqual(`export type TestObject = {
    dataAttribute1: string;
    dataAttribute2: string;
    uniqueAttribute: string;
    intAttribute: string;
};`)

    })
});
