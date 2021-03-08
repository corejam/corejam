export default {
  property: "column-rule-style",
  transform(value) {
    const valids = [
      "none",
      "hidden",
      "dotted",
      "dashed",
      "solid",
      "double",
      "groove",
      "ridge",
      "inset",
      "outset",
      "inherit",
    ];
    if (valids.includes(value)) return value;
    throw new Error("No valid property");
  },
};
