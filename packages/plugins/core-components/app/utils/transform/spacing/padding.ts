export default {
  property: ([property]) => {
    if (property.includes("pt")) return "padding-top";
    if (property.includes("pr")) return "padding-right";
    if (property.includes("pb")) return "padding-bottom";
    if (property.includes("pl")) return "padding-left";
    if (property.includes("px")) return ["padding-left", "padding-right"];
    if (property.includes("py")) return ["padding-top", "padding-bottom"];
    return "padding";
  },
  transform(value) {
    return `calc(var(--cj-box-multiplier, 0.25) * ${value}rem)`;
  },
};
