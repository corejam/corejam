export default function transform(value) {
  const valids = ["cover", "contain", "fill", "none", "scale-down"];
  if (valids.includes(value)) return value;
  throw new Error("Prop not valid");
}
