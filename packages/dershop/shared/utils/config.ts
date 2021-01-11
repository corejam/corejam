export const breakpoints = ["Sm", "Md", "Lg", "Xl"];

export const scaleMultiplier = {
  padding: { value: 0.25, unit: "rem" },
};

export const keyToPropMapping = {
  p: "padding",
  color: "color",
};

export const getTransformedValue = (property, value) => {
  if (scaleMultiplier[property]) return value * scaleMultiplier[property].value + scaleMultiplier[property].unit;
  return value;
};
