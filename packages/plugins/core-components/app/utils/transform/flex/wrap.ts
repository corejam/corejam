export default function transform(value) {
  const valids = ["wrap", "wrap-reverse", "nowrap"];
  if (valids.includes(value)) return value;
  throw new Error("Prop not valid");
}
