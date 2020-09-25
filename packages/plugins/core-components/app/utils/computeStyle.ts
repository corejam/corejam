import { hashCode } from "./utils";
import { breakpointValues } from "./style";

export function computeStyle(styles, onHost = false) {
  let collecters = {
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

  let generated = ":host { display: block; }\n ";
  Object.keys(collecters).map((key) => {
    if (key === "rules") {
      if (collecters[key].length > 0)
        generated += `${onHost ? ":host(" : ""}.##HASH##${onHost ? ")" : ""} { box-sizing: border-box; \n ${collecters[
          key
        ].join("\n")}}\n`;
      return;
    }
    if (key === "hover") {
      if (collecters[key].length > 0)
        generated += `${onHost ? ":host(" : ""}.##HASH##:hover${onHost ? ")" : ""} { ${collecters[key].join("\n")}}\n`;
      return;
    }
    if (key === "focus") {
      if (collecters[key].length > 0)
        generated += `${onHost ? ":host(" : ""}.##HASH##:focus${onHost ? ")" : ""} { ${collecters[key].join("\n")}}\n`;
      return;
    }
    if (key === "sm") {
      if (collecters[key].length > 0)
        generated += `@media screen and (min-width: ${breakpointValues.sm}px) {
                    ${onHost ? ":host(" : ""}.##HASH##${onHost ? ")" : ""} { ${collecters[key].join("\n")} }
                 }\n`;
      return;
    }
    if (key === "sm-focus") {
      if (collecters[key].length > 0)
        generated += `@media screen and (min-width: ${breakpointValues.sm}px) {
                    ${onHost ? ":host(" : ""}.##HASH##:focus${onHost ? ")" : ""} { ${collecters[key].join("\n")} }
                 }\n`;
      return;
    }
    if (key === "sm-hover") {
      if (collecters[key].length > 0)
        generated += `@media screen and (min-width: ${breakpointValues.sm}px) {
                    ${onHost ? ":host(" : ""}.##HASH##:hover${onHost ? ")" : ""} { ${collecters[key].join("\n")} }
                 }\n`;
      return;
    }
    if (key === "md") {
      if (collecters[key].length > 0)
        generated += `@media screen and (min-width: ${breakpointValues.md}px) {
                    ${onHost ? ":host(" : ""}.##HASH##${onHost ? ")" : ""} { ${collecters[key].join("\n")} }
                 }\n`;
      return;
    }
    if (key === "md-focus") {
      if (collecters[key].length > 0)
        generated += `@media screen and (min-width: ${breakpointValues.md}px) {
                    ${onHost ? ":host(" : ""}.##HASH##:focus${onHost ? ")" : ""} { ${collecters[key].join("\n")} }
                 }\n`;
      return;
    }
    if (key === "md-hover") {
      if (collecters[key].length > 0)
        generated += `@media screen and (min-width: ${breakpointValues.md}px) {
                    ${onHost ? ":host(" : ""}.##HASH##:hover${onHost ? ")" : ""} { ${collecters[key].join("\n")} }
                 }\n`;
      return;
    }
    if (key === "lg") {
      if (collecters[key].length > 0)
        generated += `@media screen and (min-width: ${breakpointValues.lg}px) {
                    ${onHost ? ":host(" : ""}.##HASH##${onHost ? ")" : ""} { ${collecters[key].join("\n")} }
                 }\n`;
      return;
    }
    if (key === "lg-focus") {
      if (collecters[key].length > 0)
        generated += `@media screen and (min-width: ${breakpointValues.lg}px) {
                    ${onHost ? ":host(" : ""}.##HASH##:focus${onHost ? ")" : ""} { ${collecters[key].join("\n")} }
                 }\n`;
      return;
    }
    if (key === "lg-hover") {
      if (collecters[key].length > 0)
        generated += `@media screen and (min-width: ${breakpointValues.lg}px) {
                    ${onHost ? ":host(" : ""}.##HASH##:hover${onHost ? ")" : ""} { ${collecters[key].join("\n")} }
                 }\n`;
      return;
    }
    if (key === "xl") {
      if (collecters[key].length > 0)
        generated += `@media screen and (min-width: ${breakpointValues.xl}px) {
                    ${onHost ? ":host(" : ""}.##HASH##${onHost ? ")" : ""} { ${collecters[key].join("\n")} }
                 }\n`;
      return;
    }
    if (key === "xl-focus") {
      if (collecters[key].length > 0)
        generated += `@media screen and (min-width: ${breakpointValues.xl}px) {
                    ${onHost ? ":host(" : ""}.##HASH##:focus${onHost ? ")" : ""} { ${collecters[key].join("\n")} }
                 }\n`;
      return;
    }
    if (key === "xl-hover") {
      if (collecters[key].length > 0)
        generated += `@media screen and (min-width: ${breakpointValues.xl}px) {
                    ${onHost ? ":host(" : ""}.##HASH##:hover${onHost ? ")" : ""} { ${collecters[key].join("\n")} }
                 }\n`;
      return;
    }
  });
  const hashcode = `cj${hashCode(styles.toString())}`.replace("-", "");

  const final = generated.replace(/##HASH##/g, hashcode);

  return final.length > 0 ? [hashcode, final] : [null, null];
}
