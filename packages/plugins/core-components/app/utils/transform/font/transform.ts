export default function transform(value) {
  const valids = ["uppercase", "lowercase", "capitalize", "normal-case"];
  if (valids.includes(value)) return value === "normal-case" ? "none" : value;
  throw new Error("Prop not valid");
}
