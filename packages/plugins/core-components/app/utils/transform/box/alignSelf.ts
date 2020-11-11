/**
 *
 * @param value
 * share inputs between component and transformers
 */

export default function transform(value) {
  const valids = ["start", "center", "end", "baseline", "stretch"];
  const transform = {
    start: "flex-start",
    end: "flex-end",
  };
  if (valids.includes(value)) {
    return transform[value] ? transform[value] : value;
  } else {
    throw new Error("No valid Prop");
  }
}
