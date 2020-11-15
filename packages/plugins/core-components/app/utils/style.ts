// import { getTransformedValue } from "./transformers";
import { PropMap } from "./propMap";
import { hashCode } from "./utils";
import { addStyleTagToHead } from "./addStyleTag";
import { computeStyle } from "./computeStyle";

const stylesCache = new Map();

/**
 *
 * 1. generate hash
 * 2. lookup cache if cache found return hash
 * 3. if no cache filter all not css props - use shared ts enum prop key ->
 * 4. normalize map in buckets: general, media, pseudo
 * 5. transform all collected entries with custom transformers
 * 6. write to cache
 * 7. return hash
 *
 */

function lowercaseFirstLetter(string) {
  return string.charAt(0).toLowerCase() + string.slice(1);
}

function renderStyleTag(styles, hash) {
  const res = computeStyle(styles, hash);
  return res;
}

function normalizeProperty(property) {
  const possibleCamelCaseSplit = property.replace(/([a-z])([A-Z])/g, "$1 $2").split(" ");

  const first = ["sm", "md", "lg", "xl", "hover", "focus"].includes(possibleCamelCaseSplit[0]);
  const second = ["sm", "md", "lg", "xl", "hover", "focus"].includes(possibleCamelCaseSplit[1]);

  if (!first && !second) return [property];
  if (first && !second) return [lowercaseFirstLetter(possibleCamelCaseSplit.slice(1).join(""))];
  if (first && second) return [lowercaseFirstLetter(possibleCamelCaseSplit.slice(2).join(""))];
}

export const calculateStyles = async (instance) => {
  const instanceName = instance.constructor.name;
  const normalizedObject = {};
  for (const property in instance) {
    if (typeof instance[property] !== "undefined") {
      const normalizedProperty = normalizeProperty(property);
      console.log(normalizedProperty, property);
      if (PropMap[normalizedProperty[0]]) {
        normalizedObject[property] = { value: instance[property], property: normalizedProperty };
      }
    }
  }
  if (Object.keys(normalizedObject).length > 0) {
    normalizedObject["instance"] = instanceName;
    const hash = "cj" + Math.floor(hashCode(JSON.stringify(normalizedObject)));
    if (stylesCache.has(hash)) {
      // we found a value in the cache and dont have to compute styles
      return stylesCache.get(hash);
    } else {
      // no cache item found, generating css with transformers
      const collectedStyles = [];
      for (const property in normalizedObject) {
        if (property !== "instance") {
          const transformer = await PropMap[normalizedObject[property].property]();
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
          } catch (e) {
            console.log(e);
          }
          if (transformer.additional) {
            collectedStyles.push(transformer.additional());
          }
        }
      }
      const readyStyleTag = renderStyleTag(collectedStyles, hash);
      addStyleTagToHead(readyStyleTag, hash);
      return hash;
    }
  }
};
