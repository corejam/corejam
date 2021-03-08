export default {
  property: "column-fill",
  transform(value) {
    const valids = ["auto", "balance", "inherit", "initial", "auto"];
    if (valids.includes(value)) return value;
    throw new Error("No valid property");
  },
};
