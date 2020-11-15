/**
 *
 * @param value
 *
 * postcss browser hook
 */

export default {
  property: "background-repeat",
  transform: (value) => {
    const valids = ["auto", "cover", "contain"];
    if (valids.includes(value)) return value;
  },
};
