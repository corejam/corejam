import ts from "typescript"

export async function run() {
    const baseModelPath = process.cwd() + "/server/Models"

    const program = ts.createProgram([`${baseModelPath}/User.ts`],
        require(process.cwd() + "/tsconfig-mjs.json")
    );

    // const typeChecker = program.getTypeChecker();
    console.log(program.getSourceFile(baseModelPath + '/User.ts'))

}