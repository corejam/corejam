import { propertyToTransformer } from "./transformerMap";
import { generateHash, lowercaseFirstLetter, addStyleTagToHead } from "./utils";
import { computeStyle } from "./computeStyle";

const stylesCache = new Map();

function normalizePropertyBasedOnPossibleIdentifiers(property) {
  const possibleCamelCaseSplit = property
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .split(" ")
    .map((s) => s.toLowerCase());

  const first = ["sm", "md", "lg", "xl", "hover", "focus"].includes(possibleCamelCaseSplit[0]);
  const second = ["sm", "md", "lg", "xl", "hover", "focus"].includes(possibleCamelCaseSplit[1]);

  if (!first && !second) return property;
  if (first && !second) return lowercaseFirstLetter(possibleCamelCaseSplit.slice(1).join(""));
  if (first && second) return lowercaseFirstLetter(possibleCamelCaseSplit.slice(2).join(""));
}

export const calculateStyles = async (instance) => {
  if (stylesCache.has("first")) {
    const styles = document && document.querySelectorAll("head styles");
    styles.forEach((style) => {
      if (style.id.includes("cj")) {
        const hash = style.id;
        const value = style.textContent;
        stylesCache.set(hash, value);
      }
    });
    stylesCache.set("first", true);
  }
  const instanceName = instance.constructor.name;
  const normalizedObject = {};
  for (const property in instance) {
    if (typeof instance[property] !== "undefined") {
      const normalizedProperty = normalizePropertyBasedOnPossibleIdentifiers(property);
      if (propertyToTransformer[normalizedProperty]) {
        normalizedObject[property] = { value: instance[property], property: normalizedProperty };
      }
    }
  }
  if (Object.keys(normalizedObject).length > 0) {
    normalizedObject["instance"] = instanceName;
    const hash = "cj" + generateHash(JSON.stringify(normalizedObject));
    if (stylesCache.has(hash)) {
      const cacheEntry = stylesCache.get(hash);
      addStyleTagToHead(cacheEntry, hash);
      return hash;
    } else {
      const collectedStyles = [];
      for (const property in normalizedObject) {
        if (property !== "instance") {
          const transformer = await propertyToTransformer[normalizedObject[property].property]();
          try {
            const instancePropertyValue = normalizedObject[property].value;
            const instanceProperty = normalizedObject[property].property;

            const transformedProperty =
              typeof transformer.property === "function"
                ? transformer.property(instanceProperty)
                : transformer.property;
            const transformedValue = transformer.transform(instancePropertyValue);

            const mergePropertyAndValue = Array.isArray(transformedProperty)
              ? transformedProperty.map((p) => `${p}: ${transformedValue};`).join("\n")
              : `${transformedProperty}: ${transformedValue};`;

            collectedStyles.push({
              _property: property,
              value: mergePropertyAndValue,
            });
            if (transformer.additional) {
              collectedStyles.push(...transformer.additional(instancePropertyValue));
            }
          } catch (e) {
            console.log(e);
          }
        }
      }
      const computedStyleString = computeStyle(collectedStyles, hash);

      stylesCache.set(hash, computedStyleString);

      addStyleTagToHead(computedStyleString, hash);
      return hash;
    }
  }
};
