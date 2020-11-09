import defaultTheme from "./default";

function camelToDash(str: string) {
  return str.replace(/([A-Z])/g, function ($1) {
    return "-" + $1.toLowerCase();
  });
}

export default function makeTheme(userTheme = null) {
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
