/**
 *
 * @param value
 *
 */

export default {
  property: "transition-duration",
  transform: (value) => {
    const valids = [75, 100, 150, 200, 300, 500, 700, 1000];
    if (valids.includes(value)) return value + "ms";
  },
};
