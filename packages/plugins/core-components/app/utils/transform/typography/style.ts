export default {
  property: "font-style",
  transform: (value) => {
    if (value === "italic" || value === "non-italic") return value;
    throw new Error("Prop not valid");
  },
};
