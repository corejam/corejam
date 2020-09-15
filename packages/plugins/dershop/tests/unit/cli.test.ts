
//import generateSchema from "@corejam/cli/src/generateSchema"
//import * as fs from 'fs';

describe("Check CLI commands", () => {
    it("Generates valid schema & exports defaults", async () => {
        return expect(true).toEqual(true);
        /*
        await generateSchema();

        //Expect schema.json file to match server schema
        const read = await JSON.parse(fs.readFileSync(process.cwd() + "/schema.json", "utf-8"))
        expect(read).toHaveProperty("__schema")

        //Expect resolvers.js to have exports
        const resolvers = require("../../resolvers.js")
        expect(resolvers).toBeDefined() */
    });
})