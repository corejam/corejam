export default {
  property: "column-span",
  transform(value) {
    const valids = ["none", "all", "inherit"];
    if (valids.includes(value)) return value;
    throw new Error("No valid property");
  },
};
