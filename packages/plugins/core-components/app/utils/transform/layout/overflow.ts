/**
 *
 * @param value
 * hook into touch and webkit prefix
 */

export default function transform(value) {
  const valids = ["auto", "hidden", "visible", "scroll"];
  if (valids.includes(value)) return value;
  throw new Error("Prop not valid");
}
