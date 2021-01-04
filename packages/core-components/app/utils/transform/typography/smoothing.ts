/**
 *
 * @param value
 *
 * postcss browser hook
 */

export default {
  property: "font-smoothing",
  transform(value) {
    const valids = ["antialiased", "auto"];
    if (valids.includes(value)) return `var(--cj-font-size-${value})`;
  },
};
