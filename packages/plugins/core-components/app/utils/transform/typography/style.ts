export default function transform(value) {
  if (value === "italic" || value === "non-italic") return value;
  throw new Error("Prop not valid");
}
