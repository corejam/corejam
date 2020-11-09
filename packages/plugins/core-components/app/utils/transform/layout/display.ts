export default function transform(value) {
  const propertyValues = ["flex", "block", "inline"];
  if (propertyValues.includes(value)) return value;
  throw new Error("Prop not valid");
}
