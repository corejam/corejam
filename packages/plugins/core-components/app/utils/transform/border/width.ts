export default {
  property: (property) => {
    if (property.includes("Top")) return "border-top-width";
    if (property.includes("Right")) return "border-right-width";
    if (property.includes("Bottom")) return "border-bottom-width";
    if (property.includes("Left")) return "border-left-width";
    return "border-width";
  },
  transform: (value) => {
    return value + "px";
  },
};
