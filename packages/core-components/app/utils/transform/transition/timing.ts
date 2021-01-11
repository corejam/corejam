/**
 *
 * @param value
 *
 */

export default {
  property: "transition-timing-function",
  transform: (value) => {
    const valids = ["linear", "in", "out", "in-out"];
    const valueMap = {
      linear: "linear",
      in: "cubic-bezier(0.4, 0, 1, 1)",
      out: "cubic-bezier(0, 0, 0.2, 1)",
      "in-out": "cubic-bezier(0.4, 0, 0.2, 1)",
    };
    if (valids.includes(value)) return valueMap[value];
  },
};
