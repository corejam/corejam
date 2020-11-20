/**
 *
 * @param value
 *
 * postcss browser hook
 */

export default {
  property: "opacity",
  transform(value) {
    const valids = [0, 25, 50, 75, 100];
    if (valids.includes(value)) return value;
  },
};
