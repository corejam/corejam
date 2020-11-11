export default function transform(value) {
  const valids = ["auto", "contain", "none"];
  if (valids.includes(value)) return value;
  throw new Error("Prop not valid");
}
