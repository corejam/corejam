export default {
  property: "font-size",
  transform(key) {
    const defaultSizes = {
      xs: "0.75rem",
      sm: "0.875rem",
      base: "1rem",
      lg: "1.125rem",
      xl: "1.25rem",
      "2xl": "1.5rem",
      "3xl": "1.875rem",
      "4xl": "2.25rem",
      "5xl": "3rem",
      "6xl": "4rem",
    };
    return `var(--cj-font-size-${key}, ${defaultSizes[key]})`;
  },
};
