export function getAllRootCSSVars() {
  const vars = Array.from(document.styleSheets)
    .filter((sheet) => sheet.href === null || sheet.href.startsWith(window.location.origin))
    .reduce(
      (acc, sheet) =>
        (acc = [
          ...acc,
          ...Array.from(sheet.cssRules).reduce(
            (def, rule) =>
              (def =
                //@ts-ignore
                rule.selectorText === ":root"
                  ? //@ts-ignore
                    [...def, ...Array.from(rule.style).filter((name) => name.startsWith("--"))]
                  : def),
            []
          ),
        ]),
      []
    );
  return vars;
}
