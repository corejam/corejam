export default {
  property: "grid-template-columns",
  transform: (value) => {
    if (isNaN(value) && value !== "none") throw new Error("Prop not valid");
    return value === "none" ? "none" : `repeat(${value}, minmax(0, 1fr))`;
  },
};
