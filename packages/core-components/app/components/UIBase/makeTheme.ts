import defaultTheme, { globalRules } from "./default";

function camelToDash(str: string) {
  return str.replace(/([A-Z])/g, function ($1) {
    return "-" + $1.toLowerCase();
  });
}

export function makeTheme(userTheme = null) {
  const themeObject = userTheme || defaultTheme;
  const rules = [];
  for (const first in themeObject) {
    if (typeof themeObject[first] === "object") {
      for (const second in themeObject[first]) {
        if (typeof themeObject[first][second] === "object") {
          for (const third in themeObject[first][second]) {
            const r = `--cj-${camelToDash(first)}-${camelToDash(second)}-${third}: ${
              themeObject[first][second][third]
            }`;
            rules.push(r);
          }
        } else {
          const r = `--cj-${camelToDash(first)}-${camelToDash(second)}: ${themeObject[first][second]}`;
          rules.push(r);
        }
      }
    }
  }
  return rules.join(";\n");
}

export function makeDefaults() {
  const rules = [];
  for (const selector in globalRules) {
    const generatedRule = [selector + "{"];
    for (const rule in globalRules[selector]) {
      generatedRule.push(rule + ": " + globalRules[selector][rule] + ";");
    }
    generatedRule.push("}");

    return generatedRule.join("\n");
  }
  return rules;
}
