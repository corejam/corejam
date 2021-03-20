import TestObject from "./TestObject";
import { CorejamServer } from "../../src/Server"
import { DocumentNotFound } from "../../src/db/Exceptions/DocumentNotFound";
import TestObject2 from "./TestObject2";

/**
 * These are tests that need to pass for each DB implementation.
 * If you want to integrate a new DB integration this is a good place to start.
 * 
 * These tests being green against your implementation means corejam applications
 * should work right out of the box.
 */
export const sharedDBInterfaceTests = (name) => {

    describe(`DB Interface tests for ${name}`, () => {

        beforeAll(async () => {
            await CorejamServer();
        })

        it("getById retrieves model", async () => {
            const testObject = new TestObject();
            testObject.dataAttribute1 = "testing"
            testObject.dataAttribute2 = "testing2"
            await testObject.save()

            expect(testObject.exists()).toBe(true)

            const test = await TestObject.getById(testObject.id as string)

            expect(test).toEqual(testObject)
        });

        it("can update an instance", async () => {
            const testObject = new TestObject();
            testObject.dataAttribute1 = "testing"
            testObject.dataAttribute2 = "testing2"
            await testObject.save();

            expect(testObject.exists()).toBe(true)

            const test = await TestObject.getById(testObject.id as string)
            expect(test).toEqual(testObject)

            testObject.dataAttribute1 = "updated value";
            await testObject.save();

            const updated = await TestObject.getById(testObject.id as string)
            expect(updated).toEqual(testObject)
        });


        it("can delete an instance", async () => {
            const testObject = new TestObject();
            testObject.dataAttribute1 = "testing"
            testObject.dataAttribute2 = "testing2"

            await testObject.save();
            expect(testObject.exists()).toBe(true)

            const tempKey = testObject.id as string

            const deleteRes = await testObject.delete()
            expect(deleteRes).toEqual(true)
            expect(testObject.exists()).toBe(false)

            //Try getting by key again
            await expect(TestObject.getById(tempKey)).rejects.toThrow(DocumentNotFound)
        });

        it("can filter", async () => {
            const testObject = new TestObject();
            testObject.dataAttribute1 = "testing"
            testObject.dataAttribute2 = "testing2"

            const testObject2 = new TestObject();
            testObject2.dataAttribute1 = "testing"
            testObject2.dataAttribute2 = "new value"

            const testObject3 = new TestObject();
            testObject3.dataAttribute1 = "testing"
            testObject3.dataAttribute2 = "new value"

            await testObject.save();
            await testObject2.save();
            await testObject3.save();

            const testFilter = await TestObject.filter({
                dataAttribute2: "new value"
            })

            expect(testFilter).toHaveLength(2);

            //Ids should be unique
            const testFilterById = await TestObject.filter({
                id: testObject.id
            })

            expect(testFilterById?.pop()).toEqual(testObject)
        });

        it("saves and loads relation correctly", async () => {
            const testObject = new TestObject();
            testObject.uniqueAttribute = "lalala"
            testObject.intAttribute = 1234;
            await testObject.save();

            const testWithForeign = new TestObject2();
            testWithForeign.optionalAttribute = testObject;
            await testWithForeign.save();

            const testForeign = await TestObject2.getById(testWithForeign.id)

            expect(testForeign.optionalAttribute).toEqual(testObject)
            expect(testForeign.optionalAttribute?.exists()).toEqual(true)
        })

        it("saves and loads multiple relations correctly", async () => {
            const testObject = new TestObject();
            testObject.uniqueAttribute = "lalala"
            testObject.intAttribute = 1234;
            await testObject.save();

            const testObject2 = new TestObject();
            testObject2.uniqueAttribute = "testtest"
            testObject2.intAttribute = 1234;
            await testObject2.save();

            const testWithForeign = new TestObject2();
            testWithForeign.relationsAttribute = [testObject, testObject2];
            await testWithForeign.save();

            const testForeign = await TestObject2.getById(testWithForeign.id) as TestObject2

            expect(testForeign?.relationsAttribute).toHaveLength(2)
            //@ts-ignore
            expect(testForeign?.relationsAttribute[0]).toStrictEqual(testObject)
        })
    })
};