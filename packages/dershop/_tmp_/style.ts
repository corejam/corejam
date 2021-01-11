import { breakpoints, scaleMultiplier, getTransformedValue, keyToPropMapping } from "./config";
import { breakpointValues } from "../styles/config";

export const collectProps = (instance, relevantProps) => {
  const props = {};
  relevantProps.forEach((prop) => {
    if (instance[prop]) props[prop] = instance[prop];
    breakpoints.forEach((b) => {
      if (instance[`${prop}${b}`]) props[`${prop}${b}`] = instance[`${prop}${b}`];
    });
  });
  return props;
};

function additionalRules(prop) {
  if (prop === "text-align") return "display: block;";
}

export const renderToRules = (property, outerElement, collectedProps) => {
  const rules = Object.keys(collectedProps).map((key) => {
    const name = key.split(/(?=[A-Z])/);
    if (name.length === 1) {
      return (
        outerElement +
        "{" +
        keyToPropMapping[name[0]] +
        ":" +
        getTransformedValue(property, collectedProps[key]) +
        "\n" +
        additionalRules(keyToPropMapping[name[0]]) +
        "}"
      );
    } else {
      return `@media (min-width: ${breakpointValues[name[1].toLowerCase()]}px) {
                ${outerElement} {
                    ${keyToPropMapping[name[0]]}: ${scaleMultiplier[property] * collectedProps[key]}rem;
                }
                }`;
    }
  });
  return rules;
};
