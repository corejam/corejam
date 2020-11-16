export default {
  property: (property) => {
    if (property.includes("Start")) return "grid-row-start";
    if (property.includes("End")) return "grid-row-end";
    return "grid-row";
  },
  transform: (value) => {
    return value;
  },
};
