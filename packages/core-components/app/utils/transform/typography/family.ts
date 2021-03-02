export default {
  property: "font-family",
  transform(value) {
    return `var(--cj-font-family-${value}, ${value})`;
  },
};
