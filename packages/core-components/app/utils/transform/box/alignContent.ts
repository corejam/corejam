/**
 *
 * @param value
 * share inputs between component and transformers
 */

export default {
  property: "align-content",
  transform: (value) => {
    const valids = ["start", "center", "end", "between", "around", "evenly"];
    const transform = {
      start: "flex-start",
      end: "flex-end",
      center: "center",
      between: "space-between",
      around: "space-around",
      evenly: "space-evenly",
    };
    if (valids.includes(value)) {
      return transform[value];
    } else {
      throw new Error("No valid Prop");
    }
  },
};
