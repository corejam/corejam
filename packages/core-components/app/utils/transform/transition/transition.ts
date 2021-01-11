/**
 *
 * @param value
 *
 */

export default {
  property: "transition-property",
  transform: (value = "background-color, border-color, color, fill, stroke, opacity, box-shadow, transform") => {
    const valids = ["none", "all", "colors", "opacity", "shadow", "transform"];
    const valueMap = {
      none: "none",
      all: "all",
      colors: "background-color, border-color, color, fill",
      opacity: "opacity",
      shadow: "shadow",
      transform: "transform",
    };
    if (valids.includes(value)) return valueMap[value];
    if (value === "background-color, border-color, color, fill, stroke, opacity, box-shadow, transform") return value;
  },
  additional: (_value) => {
    return [
      {
        _property: "transition-timing-function",
        value: "transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);",
      },
      {
        _property: "transition-duration",
        value: "transition-duration: 150ms;",
      },
    ];
  },
};
