export default {
  property: "list-style-position",
  transform(value) {
    const valids = ["outside", "inside"];
    if (valids.includes(value)) return value;
    throw new Error("Prop not valid");
  },
};
