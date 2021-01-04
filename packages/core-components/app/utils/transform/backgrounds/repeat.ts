/**
 *
 * @param value
 *
 */

export default {
  property: "background-repeat",
  transform: (value) => {
    const valids = ["repeat", "no-repeat", "repeat-x", "repeat-y", "repeat-round", "repeat-space"];
    if (valids.includes(value)) return value;
  },
};
