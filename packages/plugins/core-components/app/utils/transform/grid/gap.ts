export default {
  property: ([property]) => {
    if (property.includes("Row")) return "row-gap";
    if (property.includes("Col")) return "column-gap";
    return "gap";
  },
  transform: (value) => {
    return value === "0" ? "0" : `calc(var(--cj-grid-multiplier, 0.25) * ${value}rem)`;
  },
};
