export default function transform(value) {
  const valids = ["bottom", "center", "left", "right", "left-bottom", "left-top", "right-bottom", "right-top"];
  if (valids.includes(value)) return value;
  throw new Error("Prop not valid");
}
