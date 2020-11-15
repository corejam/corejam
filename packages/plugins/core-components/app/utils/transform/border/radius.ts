import { isBoolean } from "../../utils";

export default {
  property: (property) => {
    let prop = null;
    if (property.includes("Top")) prop = ["border-top-right-radius", "border-top-left-radius"];
    if (property.includes("Right")) prop = ["border-top-right-radius", "border-bottom-right-radius"];
    if (property.includes("Bottom")) prop = ["border-bottom-left-radius", "border-bottom-right-radius"];
    if (property.includes("Left")) prop = ["border-top-left-radius", "border-bottom-left-radius"];

    return prop ? prop : "border-radius";
  },
  transform: (value) => {
    const factor = 0.125;
    if (value === "none") return 0;
    if (isBoolean(value)) return 2 * factor + "rem";
    if (value === "sm") return factor + "rem";
    if (value === "md") return 3 * factor + "rem";
    if (value === "lg") return 4 * factor + "rem";
    if (value === "full") return "9999px";
  },
};
