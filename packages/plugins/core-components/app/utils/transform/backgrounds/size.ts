/**
 *
 * @param value
 *
 * postcss browser hook
 */

export default function transform(value) {
  const valids = ["auto", "cover", "contain"];
  if (valids.includes(value)) return value;
}
