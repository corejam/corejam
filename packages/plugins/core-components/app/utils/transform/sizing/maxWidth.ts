export default {
  property: "max-width",
  transform(value) {
    return `var(--cj-screens-${value})`;
  },
};
