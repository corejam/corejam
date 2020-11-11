/**
 *
 * @param value
 *
 * additional css
 */

export default function transform(value) {
  const valids = ["normal", "words", "all", "truncate"];
  if (valids.includes(value)) return value;
}
