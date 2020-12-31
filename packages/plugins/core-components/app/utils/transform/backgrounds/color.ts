export default {
  property: "background",
  transform: (value: string) => {
    const [color, shade] = value.split("-");
    if (["black", "white"].includes(value)) return `var(--cj-colors-${color});`;
    if (value.startsWith("--cj")) return `var(${value});`;
    if (!shade) return `var(--cj-colors-${color}-500);`;
    return `var(--cj-colors-${color}-${shade});`;
  },
};
