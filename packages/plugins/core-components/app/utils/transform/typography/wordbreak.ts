/**
 *
 * @param value
 *
 * additional css
 */
export default {
  property: "word-break",
  transform(value) {
    const valids = ["normal", "words", "all", "truncate"];
    if (valids.includes(value)) return value;
  },
};
