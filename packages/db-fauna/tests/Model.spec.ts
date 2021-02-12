import TestObject from "./TestObject";

describe("Model Tests", () => {

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

    it("getById retrieves model", async () => {
        const testObject = new TestObject();
        testObject.dataAttribute1 = "testing",
        testObject.dataAttribute2 = "testing2"

        expect(testObject.exists()).toBe(true)

        const test = await TestObject.getById(testObject.id as string)

        expect(test).toEqual(testObject)
    });

    it("can update an instance", async () => {
        const testObject = new TestObject();
        testObject.dataAttribute1 = "testing",
        testObject.dataAttribute2 = "testing2"
        await testObject.create();

        expect(testObject.exists()).toBe(true)

        const test = await TestObject.getById(testObject.id as string)
        expect(test).toEqual(testObject)

        testObject.dataAttribute1 = "updated value";
        await testObject.update();

        const updated = await TestObject.getById(testObject.id as string)
        expect(updated).toEqual(testObject)
    });


    it("can delete an instance", async () => {
        const testObject = new TestObject();
        testObject.dataAttribute1 = "testing",
        testObject.dataAttribute2 = "testing2"
        await testObject.create();
        expect(testObject.exists()).toBe(true)

        const tempKey = testObject.id as string

        const deleteRes = await testObject.delete()
        expect(deleteRes).toEqual(true)
        expect(testObject.exists()).toBe(false)

        //Try getting by key again
        expect(await TestObject.getById(tempKey)).toEqual(null)  
    });
})