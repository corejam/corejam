export default {
  property: "visibility",
  transform: (value) => {
    const valids = ["visible", "hidden"];
    if (valids.includes(value)) return value;
    throw new Error("Prop not valid");
  },
};
