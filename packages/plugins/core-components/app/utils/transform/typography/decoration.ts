export default {
  property: "text-decoration",
  transform(value: string) {
    const valids = ["underline", "line-through", "no-underline", "none"];
    if (value.startsWith("--cj")) return `var(${value})`;
    if (valids.includes(value)) return value === "no-underline" ? "none" : value;
    throw new Error("Prop not valid");
  },
};
