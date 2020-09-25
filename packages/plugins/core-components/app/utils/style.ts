import { breakpoints } from "./config";
import { getTransformedValue } from "./transformers";
import { keyToPropMapping } from "./propMapping";

export const collectProps = (instance) => {
  const props = {};
  instance._relevantProps.forEach((prop) => {
    if (typeof instance[prop] !== "undefined") props[prop] = instance[prop];
    breakpoints.forEach((b) => {
      if (instance[`${prop}${b}`]) props[`${prop}${b}`] = instance[`${prop}${b}`];
    });
  });

  return props;
};

export const breakpointValues = {
  sm: getComputedStyle(document.body).getPropertyValue("--cj-breakpoint-sm") || 640,
  md: getComputedStyle(document.body).getPropertyValue("--cj-breakpoint-md") || 768,
  lg: getComputedStyle(document.body).getPropertyValue("--cj-breakpoint-lg") || 1024,
  xl: getComputedStyle(document.body).getPropertyValue("--cj-breakpoint-xl") || 1280,
};

const normalizeResponsiveProp = (key) => {
  const groups = ["sm", "md", "lg", "xl", "hover", "focus"];
  let normalizedSplitted = key.split(/(?=[A-Z])/).map((v) => v.toLowerCase());
  // no group
  if (normalizedSplitted.length === 1) return [null, normalizedSplitted[0]];
  // dash in prop, so check

  let collectedGroups = [];
  if (groups.includes(normalizedSplitted[0])) {
    collectedGroups.push(normalizedSplitted[0]);
    normalizedSplitted.splice(0, 1);
    if (groups.includes(normalizedSplitted[0])) {
      collectedGroups.push(normalizedSplitted[0]);
      normalizedSplitted.splice(0, 1);
    }
    return [collectedGroups, normalizedSplitted.join("-")];
  }
  return [null, normalizedSplitted.join("-")];
};

function additionalRules(prop) {
  if (prop === "text-align") return "display: block;";
  if (prop === "border-width") return "border-style: solid;";
  if (prop === "border-top-width") return "border-top-style: solid;";
  if (prop === "border-right-width") return "border-right-style: solid;";
  if (prop === "border-bottom-width") return "border-bottom-style: solid;";
  if (prop === "border-left-width") return "border-left-style: solid;";
}

export const generateStyleMap = (instance, outerElement = "") => {
  const collectedProps = collectProps(instance);
  const rules = Object.keys(collectedProps).map((key: string) => {
    const [group, property] = normalizeResponsiveProp(key);
    const cssRules = Array.isArray(keyToPropMapping[property])
      ? keyToPropMapping[property]
      : [keyToPropMapping[property]];

    if (!group) {
      return cssRules
        .map((rule: string) => {
          const computedValue = getTransformedValue(property, collectedProps[key]);
          let result: string;
          if (computedValue !== "") result = rule + ": " + computedValue + ";";
          const additionals = additionalRules(rule);
          if (additionals) result += "\n" + additionals;
          return result;
        })
        .join(" ");
    } else {
      return {
        type: group,
        rule: cssRules
          .map((rule) => `${outerElement + rule + ": " + getTransformedValue(property, collectedProps[key]) + ";"}`)
          .join(" "),
      };
    }
  });
  return rules;
};
