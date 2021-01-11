export default {
  property: "text-align",
  transform(value) {
    const valids = ["left", "center", "right"];
    if (valids.includes(value)) return value === "normal-case" ? "none" : value;
    throw new Error("Prop not valid");
  },
};
