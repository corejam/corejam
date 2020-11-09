export default function transform(value) {
  return `calc(var(--cj-box-multiplier, 0.25) * ${value}rem)`;
}
