/**
 *
 * @param value
 *
 * postcss browser hook
 */
export default {
  property: "font-variant-numeric",
  transform(value) {
    const valids = [
      "normal",
      "ordinal",
      "slashed",
      "lining",
      "oldstyle",
      "proportional",
      "tabular",
      "diagonal",
      "stacked",
    ];
    const modify = {
      slashed: "sashed-zero",
      lining: "lininng-nums",
      oldstyle: "oldstyle-nums",
      proportional: "proportional-nums",
      tabular: "tabular-nums",
      diagonal: "diagonal-fractions",
      stacked: "stacked-fractions",
    };
    if (valids.includes(value)) return `var(--cj-font-size-${modify[value] || value})`;
  },
};
