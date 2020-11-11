/**
 *
 * @param value
 *
 */

export default function transform(value) {
  const valids = ["bottom", "center", "left", "left-bottom", "left-top", "right", "right-bottom", "right-top", "top"];
  if (valids.includes(value)) return value.replace("-", " ");
}
