/**
 *
 * @param value
 *
 */

export default function transform(value) {
  const valids = ["solid", "dashed", "dotted", "double", "none"];
  if (valids.includes(value)) return value;
}
