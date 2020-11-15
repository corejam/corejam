function bucketSplit(property) {
  const possibleCamelCaseSplit = property.replace(/([a-z])([A-Z])/g, "$1 $2").split(" ");
  const first = ["sm", "md", "lg", "xl", "hover", "focus"].includes(possibleCamelCaseSplit[0]);
  const second = ["sm", "md", "lg", "xl", "hover", "focus"].includes(possibleCamelCaseSplit[1]);

  if (!first && !second) return [property];
  if (first && !second) return [possibleCamelCaseSplit[0], possibleCamelCaseSplit.slice(1).join("-")];
  if (first && second)
    return [possibleCamelCaseSplit[0], possibleCamelCaseSplit[1], possibleCamelCaseSplit.slice(2).join("-")];
}

export function computeStyle(styles, hash = null) {
  const breakpoints = {
    sm: window.getComputedStyle(document.documentElement).getPropertyValue("--cj-screens-sm"),
    md: window.getComputedStyle(document.documentElement).getPropertyValue("--cj-screens-md"),
    lg: window.getComputedStyle(document.documentElement).getPropertyValue("--cj-screens-lg"),
    xl: window.getComputedStyle(document.documentElement).getPropertyValue("--cj-screens-xl"),
  };
  const collecters = {
    rules: [],
    hover: {
      rules: [],
    },
    focus: {
      rules: [],
    },
    sm: {
      rules: [],
    },
    "sm-focus": {
      rules: [],
    },
    "sm-hover": {
      rules: [],
    },
    md: {
      rules: [],
    },
    "md-focus": {
      rules: [],
    },
    "md-hover": {
      rules: [],
    },
    lg: {
      rules: [],
    },
    "lg-focus": {
      rules: [],
    },
    "lg-hover": {
      rules: [],
    },
    xl: {
      rules: [],
    },
    "xl-focus": {
      rules: [],
    },
    "xl-hover": {
      rules: [],
    },
  };

  styles.forEach((prop) => {
    const splitted = bucketSplit(prop._property);
    if (splitted.length === 1) collecters.rules.push(prop.value);
    if (splitted.length === 2) collecters[splitted[0]].rules.push(prop.value);
    if (splitted.length === 3) collecters[`${splitted[0]}-${splitted[1]}`].rules.push(prop.value);
  });
  let generated = `.${hash} { display: block; }\n `;
  Object.keys(collecters).map((key) => {
    if (key === "rules") {
      if (collecters[key].length > 0)
        generated += `.${hash} { box-sizing: border-box; \n ${collecters[key].join("\n")}}\n`;
      return;
    }
    if (key === "hover") {
      if (collecters[key].rules.length > 0) generated += `.${hash}:hover { ${collecters[key].rules.join("\n")}}\n`;
      return;
    }
    if (key === "focus") {
      if (collecters[key].rules.length > 0) generated += `.${hash}:focus{ ${collecters[key].rules.join("\n")}}\n`;
      return;
    }
    if (key === "sm") {
      if (collecters[key].rules.length > 0)
        generated += `@media screen and (min-width:${breakpoints.sm}) {
                        .${hash} { ${collecters[key].rules.join("\n")} }
                 }\n`;
      return;
    }
    if (key === "sm-focus") {
      if (collecters[key].rules.length > 0)
        generated += `@media screen and (min-width: ${breakpoints.sm}) {
                    .${hash}:focus : ""} { ${collecters[key].rules.join("\n")} }
                 }\n`;
      return;
    }
    if (key === "sm-hover") {
      if (collecters[key].rules.length > 0)
        generated += `@media screen and (min-width: ${breakpoints.sm}) {
                    .${hash}:hover { ${collecters[key].rules.join("\n")} }
                 }\n`;
      return;
    }
    if (key === "md") {
      if (collecters[key].rules.length > 0)
        generated += `@media screen and (min-width:${breakpoints.md}) {\n.${hash} { ${collecters[key].rules.join(
          "\n"
        )} }\n}\n`;
      return;
    }
    if (key === "md-focus") {
      if (collecters[key].rules.length > 0)
        generated += `@media screen and (min-width: ${breakpoints.md}) {
                        .${hash}:focus { ${collecters[key].rules.join("\n")} }
                 }\n`;
      return;
    }
    if (key === "md-hover") {
      if (collecters[key].rules.length > 0)
        generated += `@media screen and (min-width: ${breakpoints.md}) {
                    .${hash}:hover { ${collecters[key].rules.join("\n")} }
                 }\n`;
      return;
    }
    if (key === "lg") {
      if (collecters[key].rules.length > 0)
        generated += `@media screen and (min-width: ${breakpoints.lg}) {
                    .${hash} { ${collecters[key].rules.join("\n")} }
                 }\n`;
      return;
    }
    if (key === "lg-focus") {
      if (collecters[key].rules.length > 0)
        generated += `@media screen and (min-width: ${breakpoints.lg}) {
                    .${hash}:focus { ${collecters[key].rules.join("\n")} }
                 }\n`;
      return;
    }
    if (key === "lg-hover") {
      if (collecters[key].rules.length > 0)
        generated += `@media screen and (min-width: ${breakpoints.lg}) {
                      .${hash}:hover { ${collecters[key].rules.join("\n")} }
                 }\n`;
      return;
    }
    if (key === "xl") {
      if (collecters[key].rules.length > 0)
        generated += `@media screen and (min-width: ${breakpoints.xl}) {
                       .${hash} { ${collecters[key].rules.join("\n")} }
                 }\n`;
      return;
    }
    if (key === "xl-focus") {
      if (collecters[key].rules.length > 0)
        generated += `@media screen and (min-width: ${breakpoints.xl}) {
                      .${hash}:focus { ${collecters[key].rules.join("\n")} }
                 }\n`;
      return;
    }
    if (key === "xl-hover") {
      if (collecters[key].rules.length > 0)
        generated += `@media screen and (min-width: ${breakpoints.xl}) {
                    .${hash}:hover { ${collecters[key].rules.join("\n")} }
                 }\n`;
      return;
    }
  });

  return generated;
}
