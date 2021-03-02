export default {
  property: "font-family",
  transform(value) {
    return `var(--cj-font-size-${value}, ${value})`;
  },
};
