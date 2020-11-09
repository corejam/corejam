export default function transform(value) {
  const propertyValues = ["auto", "initial", "inherit"];
  if (propertyValues.includes(value)) return value;
  return `calc(var(--cj-box-multiplier, 0.25) * ${value}rem)`;
}
