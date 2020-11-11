export default function transform(value) {
  const defaults = {
    none: "1",
    tight: "1.25",
    snug: "1.375",
    normal: "1.5",
    relaxed: "1.625",
    loose: "2",
    "3": ".75rem",
    "4": "1rem",
    "5": "1.25rem",
    "6": "1.5rem",
    "7": "1.75rem",
    "8": "2rem",
    "9": "2.25rem",
    "10": "2.5rem",
  };
  const validValues = ["none", "tight", "snug", "normal", "relaxed", "loose", 3, 4, 5, 6, 7, 8, 9, 10];
  if (validValues.includes(value)) return `var(--cj-font-line-height-${value}, ${defaults[value]})`;
}
