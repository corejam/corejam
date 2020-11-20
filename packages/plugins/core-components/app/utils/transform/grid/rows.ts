export default {
  property: "grid-row",
  transform: (value) => {
    if (isNaN(value) && !["none", "auto"].includes(value)) throw new Error("Prop not valid");
    return isNaN(value) ? value : `span ${value} / span ${value}`;
  },
};
