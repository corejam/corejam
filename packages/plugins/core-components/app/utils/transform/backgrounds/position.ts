/**
 *
 * @param value
 *
 */

export default {
  property: "background-position",
  transform: (value) => {
    const valids = ["bottom", "center", "left", "left-bottom", "left-top", "right", "right-bottom", "right-top", "top"];
    if (valids.includes(value)) return value.replace("-", " ");
  },
};
