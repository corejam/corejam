export default {
  property: "grid-auto-flow",
  transform: (value) => {
    const valids = ["row", "column", "row-dense", "column-dense"];
    if (valids.includes(value)) return value;
    throw new Error("Prop not valid");
  },
};
