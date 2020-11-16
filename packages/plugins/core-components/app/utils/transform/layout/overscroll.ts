export default {
  property: "overscrol-behavior",
  transform: (value) => {
    const valids = ["auto", "contain", "none"];
    if (valids.includes(value)) return value;
    throw new Error("Prop not valid");
  },
};
