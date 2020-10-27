import { hashCode } from "./utils";
import { breakpointValues } from "./style";

export function computeStyle(styles) {
  const collecters = {
    rules: [],
    hover: [],
    focus: [],
    sm: [],
    "sm-focus": [],
    "sm-hover": [],
    md: [],
    "md-focus": [],
    "md-hover": [],
    lg: [],
    "lg-focus": [],
    "lg-hover": [],
    xl: [],
    "xl-focus": [],
    "xl-hover": [],
  };
  styles.map((rule) => {
    if (typeof rule === "object") {
      // another pseudo
      if (rule.type.length > 1) {
        collecters[rule.type[0] + "-" + rule.type[1]].push(rule.rule);
        return;
      } else {
        collecters[rule.type].push(rule.rule);
        return;
      }
    } else {
      collecters["rules"].push(rule);
    }
  });

  let generated = `.##HASH## { display: block; }\n `;
  Object.keys(collecters).map((key) => {
    if (key === "rules") {
      if (collecters[key].length > 0)
        generated += `.##HASH## { box-sizing: border-box; \n ${collecters[key].join("\n")}}\n`;
      return;
    }
    if (key === "hover") {
      if (collecters[key].length > 0) generated += `.##HASH##:hover { ${collecters[key].join("\n")}}\n`;
      return;
    }
    if (key === "focus") {
      if (collecters[key].length > 0) generated += `.##HASH##:focus{ ${collecters[key].join("\n")}}\n`;
      return;
    }
    if (key === "sm") {
      if (collecters[key].length > 0)
        generated += `@media screen and (min-width: ${breakpointValues.sm}px) {
                        .##HASH## { ${collecters[key].join("\n")} }
                 }\n`;
      return;
    }
    if (key === "sm-focus") {
      if (collecters[key].length > 0)
        generated += `@media screen and (min-width: ${breakpointValues.sm}px) {
                    .##HASH##:focus : ""} { ${collecters[key].join("\n")} }
                 }\n`;
      return;
    }
    if (key === "sm-hover") {
      if (collecters[key].length > 0)
        generated += `@media screen and (min-width: ${breakpointValues.sm}px) {
                    .##HASH##:hover { ${collecters[key].join("\n")} }
                 }\n`;
      return;
    }
    if (key === "md") {
      if (collecters[key].length > 0)
        generated += `@media screen and (min-width: ${breakpointValues.md}px) {
                      .##HASH## { ${collecters[key].join("\n")} }
                 }\n`;
      return;
    }
    if (key === "md-focus") {
      if (collecters[key].length > 0)
        generated += `@media screen and (min-width: ${breakpointValues.md}px) {
                        .##HASH##:focus { ${collecters[key].join("\n")} }
                 }\n`;
      return;
    }
    if (key === "md-hover") {
      if (collecters[key].length > 0)
        generated += `@media screen and (min-width: ${breakpointValues.md}px) {
                    .##HASH##:hover { ${collecters[key].join("\n")} }
                 }\n`;
      return;
    }
    if (key === "lg") {
      if (collecters[key].length > 0)
        generated += `@media screen and (min-width: ${breakpointValues.lg}px) {
                    .##HASH## { ${collecters[key].join("\n")} }
                 }\n`;
      return;
    }
    if (key === "lg-focus") {
      if (collecters[key].length > 0)
        generated += `@media screen and (min-width: ${breakpointValues.lg}px) {
                    .##HASH##:focus { ${collecters[key].join("\n")} }
                 }\n`;
      return;
    }
    if (key === "lg-hover") {
      if (collecters[key].length > 0)
        generated += `@media screen and (min-width: ${breakpointValues.lg}px) {
                      .##HASH##:hover { ${collecters[key].join("\n")} }
                 }\n`;
      return;
    }
    if (key === "xl") {
      if (collecters[key].length > 0)
        generated += `@media screen and (min-width: ${breakpointValues.xl}px) {
                       .##HASH## { ${collecters[key].join("\n")} }
                 }\n`;
      return;
    }
    if (key === "xl-focus") {
      if (collecters[key].length > 0)
        generated += `@media screen and (min-width: ${breakpointValues.xl}px) {
                      .##HASH##:focus { ${collecters[key].join("\n")} }
                 }\n`;
      return;
    }
    if (key === "xl-hover") {
      if (collecters[key].length > 0)
        generated += `@media screen and (min-width: ${breakpointValues.xl}px) {
                    .##HASH##:hover { ${collecters[key].join("\n")} }
                 }\n`;
      return;
    }
  });
  const hashcode = `cj${hashCode(styles.toString())}`.replace("-", "");

  const final = generated.replace(/##HASH##/g, hashcode);

  return final.length > 0 ? [hashcode, final] : [null, null];
}
