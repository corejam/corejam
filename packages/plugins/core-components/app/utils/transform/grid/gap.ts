export default function transform(value) {
  return value === "0" ? "0" : `calc(var(--cj-grid-multiplier, 0.25) * ${value}rem)`;
}
