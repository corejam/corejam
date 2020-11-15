export default {
  property: ([property]) => {
    if (property.includes("mt")) return "margin-top";
    if (property.includes("mr")) return "margin-right";
    if (property.includes("mb")) return "margin-bottom";
    if (property.includes("ml")) return "margin-left";
    if (property.includes("mx")) return ["margin-left", "margin-right"];
    if (property.includes("my")) return ["margin-top", "margin-bottom"];
    return "margin";
  },
  transform(value) {
    const propertyValues = ["auto", "initial", "inherit"];
    if (propertyValues.includes(value)) return value;
    return `calc(var(--cj-box-multiplier, 0.25) * ${value}rem)`;
  },
};
