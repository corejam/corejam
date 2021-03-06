import { CoreModel } from "@corejam/base/dist/db/CoreModel";
import jetpack from "fs-jetpack";
import ts from "typescript"

type modelTypes = {
    dist: string;
    filename: string;
    name: string;
    fields: { name: string, optional: Boolean, node: ts.PropertyDeclaration }[]
}

function getBaseModelPath() {
    return process.cwd() + "/server/Models/";
}

/**
 * Compile types to use in the frontend based 
 * on your decorators given to models.
 * 
 * With inspiration from https://github.com/ionic-team/stencil/blob/master/src/compiler/transformers/decorators-to-static/prop-decorator.ts
 * 
 * This needs to be refactored to either complete use the typescript compiler api
 * or in future use the default decorator support in typescript.
 * 
 * We currently only use this because we need to check if attributes are optional when
 * generating types for the frontend app.
 */
export async function run() {
    const baseModelPath = getBaseModelPath()
    const files = await jetpack.listAsync(baseModelPath)
    const models = await jetpack.listAsync(getBaseModelPath())

    if (!files || !models) {
        return;
    }

    const program = ts.createProgram(models?.map(file => {
        return baseModelPath + file
    }),
        require(process.cwd() + "/tsconfig-mjs.json")
    );

    //const checker = program.getTypeChecker();

    models?.forEach(modelFile => {
        const source = program.getSourceFile(baseModelPath + modelFile) as ts.SourceFile
        const types: modelTypes[] = [];

        ts.forEachChild(source, node => {
            if (ts.isClassDeclaration(node)) {
                const type = {
                    filename: source.fileName,
                    dist: source.fileName.replace(process.cwd(), process.cwd() + "/dist").replace(".ts", ".js"),
                    name: "",
                    fields: []
                }

                const classMembers = node.members
                const decoratedMembers = classMembers.filter(member => Array.isArray(member.decorators) && member.decorators.length > 0);

                const coredata = decoratedMembers
                    .filter(ts.isPropertyDeclaration)
                    .map((prop) => {
                        let decoratorCheck;

                        prop.decorators?.map(decorator => {
                            //@ts-ignore
                            if (decorator.expression.expression.escapedText) {
                                decoratorCheck = decorator;
                            }
                            return null
                        })

                        if (decoratorCheck) return prop

                        return null
                    })
                    .filter(prop => prop != null);

                type.name = node.name?.escapedText as string;

                coredata.map(node => {
                    //@ts-ignore
                    type.fields.push({ name: node?.name?.escapedText, optional: node?.questionToken ? true : false, node: node })
                })

                types.push(type)
            }
        });

        let res = ""

        types.forEach(type => {
            const modelsInFile = require(type.dist) as CoreModel[];

            for (const model in modelsInFile) {
                //@ts-ignore
                const instance = new modelsInFile[model]

                const meta = instance.getMeta();

                const bla = ts.factory.createTypeAliasDeclaration(
                    undefined,
                    [ts.factory.createModifier(ts.SyntaxKind.ExportKeyword)],
                    ts.factory.createIdentifier(instance.constructor.name),
                    undefined,
                    ts.factory.createTypeLiteralNode(
                        Object.keys(meta).map((key) => {

                            //get associated compiler types
                            const field = type.fields.filter(type => {
                                if (type.name == key) return type;

                                return
                            })[0]

                            return ts.factory.createPropertySignature(
                                undefined,
                                ts.factory.createIdentifier(key),
                                field.optional ? ts.factory.createToken(ts.SyntaxKind.QuestionToken) : undefined,
                                ts.factory.createTypeReferenceNode(
                                    ts.factory.createIdentifier(meta[key].type)
                                )
                            );
                        })
                    )
                );

                const printer = ts.createPrinter();
                const sourceFile = ts.createSourceFile("test.ts", "", ts.ScriptTarget.ES5);

                res += printer.printNode(ts.EmitHint.Unspecified, bla, sourceFile);
            }

            console.log(res)

            return;
        })
    })
}