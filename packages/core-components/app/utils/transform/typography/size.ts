export default {
  property: "font-size",
  transform(key: string) {
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
    const isNumericValue = () => key.includes("px") || key.includes("em") || key.includes("rem");
    return key in defaultSizes
      ? `var(--cj-font-size-${key}, ${defaultSizes[key]})`
      : isNumericValue()
      ? key
      : `var(--cj-font-size-${key})`;
  },
};
