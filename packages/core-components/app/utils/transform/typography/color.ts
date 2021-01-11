export default {
  property: "color",
  transform(value: string) {
    const [color, shade] = value.split("-");
    if (["black", "white"].includes(value)) return `var(--cj-colors-${color}, ${color})`;
    if (value.startsWith("--cj")) return `var(${value}, #000)`;
    if (!shade) return `var(--cj-colors-${color}-500)`;
    return `var(--cj-colors-${color}-${shade})`;
  },
};
