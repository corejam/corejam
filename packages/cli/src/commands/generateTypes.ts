import jetpack from "fs-jetpack";
import { createTypeFromModel } from "@corejam/base/dist/db/ModelHelper"

/**
 * Generate types from our Models to use in our 
 * frontend .tsx files.
 */
export default async function generateTypes(_options: any) {

    const baseModelPath = process.cwd() + "/server/Models"
    const distModelPath = process.cwd() + "/dist/server/Models";

    //const logToConsole = options.l ? "inherit" : "ignore";

    //Collect all models from /Models directory
    const files = await jetpack.listAsync(baseModelPath)

    let res = `// This file is auto generated based on your models
// do not make changes here

`
    files?.forEach(file => {
        const bla = require(distModelPath + `/${file.replace(".ts", ".js")}`)

        for (const model in bla) {
            res += createTypeFromModel(new bla[model]) + "\n\n"
        }
    })

    await jetpack.writeAsync(process.cwd() + "/app/types/Models.ts", res);
}