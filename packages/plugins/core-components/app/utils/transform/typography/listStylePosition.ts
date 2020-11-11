export default function transform(value) {
  const valids = ["outside", "inside"];
  if (valids.includes(value)) return value;
  throw new Error("Prop not valid");
}
