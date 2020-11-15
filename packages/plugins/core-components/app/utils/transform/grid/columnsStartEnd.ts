export default {
  property: ([property]) => {
    if (property.includes("Start")) return "grid-column-start";
    if (property.includes("End")) return "grid-column-end";
    return "grid-column";
  },
  transform: (value) => {
    return value;
  },
};
