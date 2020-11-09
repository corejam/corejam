export default function transform(value) {
  const propertyValues = ["flex", "block", "inline", "none"];
  if (propertyValues.includes(value)) return value;
  throw new Error("Prop not valid");
}
