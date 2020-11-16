export default {
  property: "display",
  transform(value) {
    return value ? "flex" : "initial";
  },
};
