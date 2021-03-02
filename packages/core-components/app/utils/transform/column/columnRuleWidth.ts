export default {
  property: "column-rule-width",
  transform(value: string) {
    const valids = ["thin", "medium", "thick"];
    const numerics = value.includes("em") || value.includes("rem") || value.includes("px");
    if (valids.includes(value) || numerics) return value;
    throw new Error("No valid property");
  },
};
