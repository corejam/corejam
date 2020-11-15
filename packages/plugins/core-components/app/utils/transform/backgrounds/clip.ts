/**
 *
 * @param value
 *
 */

export default {
  property: "background-clip",
  transform: (value) => {
    const valids = ["border", "padding", "content", "text"];
    const modify = {
      border: "border-box",
      padding: "padding-box",
      content: "content-box",
    };
    if (valids.includes(value)) return modify[value] || value;
  },
};
