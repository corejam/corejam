/**
 *
 * @param value
 *
 * postcss browser hook
 */

export default function transform(value) {
  const valids = ["antialiased", "auto"];
  if (valids.includes(value)) return `var(--cj-font-size-${value})`;
}
