import { isBoolean } from "../../utils";

export default {
  property: ([instanceProperty]) => {
    let prop = null;
    if (instanceProperty.includes("Top")) prop = ["border-top-right-radius", "border-top-left-radius"];
    if (instanceProperty.includes("Right")) prop = ["border-top-right-radius", "border-bottom-right-radius"];
    if (instanceProperty.includes("Bottom")) prop = ["border-bottom-left-radius", "border-bottom-right-radius"];
    if (instanceProperty.includes("Left")) prop = ["border-top-left-radius", "border-bottom-left-radius"];

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
