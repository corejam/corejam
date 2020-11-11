export default function transform(value) {
  const valids = ["none", "disc", "decimal"];
  if (valids.includes(value)) return value;
  throw new Error("Prop not valid");
}
