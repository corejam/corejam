export default {
  property: "flex-direction",
  transform: (value) => {
    const valids = ["row", "row-reverse", "col", "col-reverse"];
    const transform = {
      col: "column",
      "col-reverse": "column-reverse",
      row: "row",
      "row-reverse": "row-reverse",
    };
    if (valids.includes(value)) {
      return transform[value];
    } else {
      throw new Error("No valid Prop");
    }
  },
};
