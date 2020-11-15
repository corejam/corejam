export default {
  property: "letter-spacing",
  transform(value) {
    const defaults = {
      tighter: "-0.05em",
      tight: "-0.025em",
      normal: "0",
      wide: "0.025em",
      wider: "0.05em",
      widest: "0.1em",
    };
    const validValues = ["tighter", "tight", "normal", "wide", "wider", "widest"];
    if (validValues.includes(value)) return `var(--cj-font-spacing-${value}, ${defaults[value]})`;
  },
};
