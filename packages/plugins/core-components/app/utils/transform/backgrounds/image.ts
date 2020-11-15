/**
 *
 * @param value
 *
 * postcss browser hook
 */
export default {
  property: "backgorund-image",
  transform: (value) => {
    const valids = ["top", "top-right", "right", "bottom-right", "bottom", "bottom-left", "left", "top-left"];

    if (valids.includes(value)) return `linear-gradient(to ${value.replace("-", " ")}, var(--gradient-color-stops));`;
  },
};
