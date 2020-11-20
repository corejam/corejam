/**
 *
 * @param value
 * share inputs between component and transformers
 */

export default {
  property: "place-content",
  transform: (value) => {
    const valids = ["start", "center", "end", "between", "around", "evenly", "stretch"];
    const transform = {
      start: "flex-start",
      end: "flex-end",
      between: "space-between",
      around: "space-around",
      evenly: "space-evenly",
    };
    if (valids.includes(value)) {
      return transform[value] ? transform[value] : value;
    } else {
      throw new Error("No valid Prop");
    }
  },
};
