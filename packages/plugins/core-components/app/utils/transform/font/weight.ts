export default function transform(value) {
  const defaults = {
    hairline: "100",
    thin: "200",
    light: "300",
    normal: "400",
    medium: "500",
    semibold: "600",
    bold: "700",
    extrabold: "800",
    black: "900",
  };
  const valids = ["hairline", "thin", "normal", "medium", "semibold", "bold", "extrabold", "black"];
  if (valids.includes(value)) return `var(--cj-font-weight-${value}, ${defaults[value]})`;
  throw new Error("Prop not valid");
}
