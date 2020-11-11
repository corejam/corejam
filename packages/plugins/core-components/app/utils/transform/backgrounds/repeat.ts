/**
 *
 * @param value
 *
 */

export default function transform(value) {
  const valids = ["repeat", "no-repeat", "repeat-x", "repeat-y", "repeat-round", "repeat-space"];
  if (valids.includes(value)) return value;
}
