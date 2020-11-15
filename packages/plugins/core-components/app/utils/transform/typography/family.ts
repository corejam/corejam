export default {
  property: "font-family",
  transform(value) {
    const valids = ["sans", "serif", "mono"];
    if (valids.includes(value)) return `var(--cj-font-size-${value})`;
  },
};
