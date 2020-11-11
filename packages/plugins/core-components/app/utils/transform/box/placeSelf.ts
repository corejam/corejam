/**
 *
 * @param value
 * share inputs between component and transformers
 */

export default function transform(value) {
  const valids = ["start", "center", "end", "auto", "stretch"];

  if (valids.includes(value)) {
    return value;
  } else {
    throw new Error("No valid Prop");
  }
}
