/**
 *
 * @param value
 *
 * postcss browser hook
 */

export default {
  property: "box-shadow",
  transform: (value) => {
    const valids = ["xs", "sm", "md", "lg", "xl", "2xl", "inner", "outline", "none"];
    const res = {
      xs: "0 0 0 1px rgba(0, 0, 0, 0.05)",
      sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
      md: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
      lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);",
      xl: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);",
      "2xl": "0 25px 50px -12px rgba(0, 0, 0, 0.25);",
      inner: "inset 0 2px 4px 0 rgba(0, 0, 0, 0.06);",
      outline: "0 0 0 3px rgba(66, 153, 225, 0.5);",
      none: "none",
    };
    if (valids.includes(value)) return res[value];
    return value;
  },
};
