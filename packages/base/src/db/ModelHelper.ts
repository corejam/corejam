import * as ts from "typescript";
import { CoreModel } from "./CoreModel";

/**
 * This function generates the shared/types/models
 * for us to use in our frontend.
 *
 * These are auto generated based on your current model so they should not be manually edited
 */
export function createTypeFromModel<T extends CoreModel>(model: T) {
  const meta = model.getMeta();
  console.log(meta);

  const bla = ts.factory.createTypeAliasDeclaration(
    undefined,
    [ts.factory.createModifier(ts.SyntaxKind.ExportKeyword)],
    ts.factory.createIdentifier(model.constructor.name),
    undefined,
    ts.factory.createTypeLiteralNode(
      Object.keys(meta).map((key) => {
        return ts.factory.createPropertySignature(
          undefined,
          ts.factory.createIdentifier(key),
          undefined,
          ts.factory.createKeywordTypeNode(ts.SyntaxKind.StringKeyword)
        )
      })
    )
  );

  const printer = ts.createPrinter();
  const sourceFile = ts.createSourceFile("test.ts", "", ts.ScriptTarget.ES5);

  return printer.printNode(ts.EmitHint.Unspecified, bla, sourceFile);
}
