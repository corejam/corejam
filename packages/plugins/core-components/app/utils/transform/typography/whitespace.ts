/**
 *
 * @param value
 *
 * postcss browser hook
 */

export default function transform(value) {
  const valids = ["normal", "nowrap", "pre", "preline", "prewrap"];
  const modify = {
    preline: "pre-line",
    prewrap: "pre-wrap",
  };
  if (valids.includes(value)) return modify[value] || value;
}
