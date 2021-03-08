import { CoreModel } from "@corejam/base/dist/db/CoreModel";
import * as jetpack from "fs-jetpack";
import * as ts from "typescript"

type modelTypes = {
    dist: string;
    filename: string;
    name: string;
    fields: { name: string, optional: Boolean, node: ts.PropertyDeclaration }[]
}

//The printed output
let res = `/**
* DO NOT EDIT
* This file is auto generated from your model @Corejam() decorators
* It should be commited as a way to keep track of your public facing
* model changes that interact with your frontend
*/


`

const printer = ts.createPrinter();
const sourceFile = ts.createSourceFile("types.ts", "", ts.ScriptTarget.ES5);

export function getBaseModelPath() {
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
export async function run(baseModelPath = getBaseModelPath()) {
    const models = await jetpack.listAsync(baseModelPath)

    if (!models) {
        console.log("No models to parse");
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
            if (ts.isTypeAliasDeclaration(node)) {
                createTypeAliasDeclaration(node)
            }

            if (ts.isEnumDeclaration(node)) {
                createEnumDeclaration(node)
            }

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
                            if (decorator.expression.expression.escapedText === "Corejam") {
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

        types.forEach(type => {

            const modelsInFile = require(type.dist) as CoreModel[];

            for (const model in modelsInFile) {
                //@ts-ignore
                const instance = new modelsInFile[model]

                const typeAlias = ts.factory.createTypeAliasDeclaration(
                    undefined,
                    [ts.factory.createModifier(ts.SyntaxKind.ExportKeyword)],
                    ts.factory.createIdentifier(instance.constructor.name),
                    undefined,
                    ts.factory.createTypeLiteralNode(
                        type.fields.map(field => {
                            return ts.factory.createPropertySignature(
                                undefined,
                                //@ts-ignore
                                ts.factory.createIdentifier(field.name),
                                field.optional ? ts.factory.createToken(ts.SyntaxKind.QuestionToken) : undefined,
                                createTypeNode(field.node)
                            );
                        })
                    )
                );

                res += printer.printNode(ts.EmitHint.Unspecified, typeAlias, sourceFile);
            }

            console.log(res)

            return;
        })
    })

    jetpack.writeAsync(process.cwd() + "/app/types/Corejam.ts", res)
}

function createTypeAliasDeclaration(node: ts.Node) {

    const createdNode = ts.factory.createTypeAliasDeclaration(
        undefined,
        [ts.factory.createModifier(ts.SyntaxKind.ExportKeyword)],
        //@ts-ignore
        ts.factory.createIdentifier(node.name.escapedText),
        undefined,
        ts.factory.createTypeLiteralNode(
            //@ts-ignore
            node.type.members.map(member => {
                return ts.factory.createPropertySignature(
                    undefined,
                    //@ts-ignore
                    ts.factory.createIdentifier(member.name.escapedText),
                    undefined,
                    ts.factory.createKeywordTypeNode(member.type.kind)
                )
            })
        )
    )

    res += printer.printNode(ts.EmitHint.Unspecified, createdNode, sourceFile)
    res += "\n\n";
}

function createEnumDeclaration(node: ts.Node) {

    const createdNode = ts.factory.createEnumDeclaration(
        undefined,
        undefined,
        //@ts-ignore
        ts.factory.createIdentifier(node.name.escapedText),
        //@ts-ignore
        node.members.map(node => {
            return ts.factory.createEnumMember(
                ts.factory.createIdentifier(node.name.escapedText),
                ts.factory.createStringLiteral(node.initializer.text)
            )
        })
    )

    res += printer.printNode(ts.EmitHint.Unspecified, createdNode, sourceFile)
    res += "\n\n";
}

function createTypeNode(node: ts.Node) {

    //@ts-ignore
    if (ts.isTypeReferenceNode(node?.type)) {
        return ts.factory.createTypeReferenceNode(
            //@ts-ignore
            ts.factory.createIdentifier(node.type.typeName.escapedText),
        )
    }

    if (ts.isLiteralTypeNode(node)) {
        return ts.factory.createTypeReferenceNode(
            //@ts-ignore
            ts.factory.createIdentifier(field.node.typeName ? field.node.typeName.escapedText : ts.factory.createKeywordTypeNode(field.node.type.kind))
        )
    }

    //@ts-ignore
    if (ts.isToken(node.type)) {
        return ts.factory.createTypeReferenceNode(
            //@ts-ignore
            ts.factory.createKeywordTypeNode(node.type.kind)
        )
    }

    //@ts-ignore
    if (ts.isTupleTypeNode(node.type)) {
        return ts.factory.createTupleTypeNode(
            //@ts-ignore
            [ts.factory.createTypeReferenceNode(ts.factory.createIdentifier(node.initializer.elements[0].expression.escapedText), undefined)])

    }

    throw Error("missing type")

}