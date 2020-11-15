export default {
  property: "flex-shrink",
  transform: (value) => {
    const valids = [0, 1];
    if (valids.includes(value)) return value;
    throw new Error("Prop not valid");
  },
};
