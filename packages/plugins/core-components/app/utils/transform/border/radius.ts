import { isBoolean } from "../../utils";

export default function transform(value) {
  const factor = 0.125;
  if (value === "none") return 0;
  if (isBoolean(value)) return 2 * factor + "rem";
  if (value === "sm") return factor + "rem";
  if (value === "md") return 3 * factor + "rem";
  if (value === "lg") return 4 * factor + "rem";
  if (value === "full") return "9999px";
}
