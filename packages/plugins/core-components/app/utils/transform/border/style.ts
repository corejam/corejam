/**
 *
 * @param value
 *
 */

export default {
  property: "border-style",
  transform: (value) => {
    const valids = ["solid", "dashed", "dotted", "double", "none"];
    if (valids.includes(value)) return value;
  },
};
