const read = jest.fn();
const save = jest.fn();
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
        create,
        update,
        delete: deleteFn
    })
}))

import TestObject from "./dbInterface/TestObject";

describe(`Base Model tests`, () => {

    it("Validate getDataFields only has our decorated attributes", async () => {
        const testObject = new TestObject();

        expect(testObject.getDataFields()).toEqual([
            "dataAttribute1",
            "dataAttribute2"
        ])
    });

    it("Validate getData only returns our decorated data", async () => {
        const testObject = new TestObject();

        expect(testObject.getData()).toEqual({
            dataAttribute1: "attribute1",
            dataAttribute2: "attribute2"
        })

        //Change a value
        testObject.dataAttribute1 = "new value"

        expect(testObject.getData()).toEqual({
            dataAttribute1: "new value",
            dataAttribute2: "attribute2"
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
    })
});