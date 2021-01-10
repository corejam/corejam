import { renderToRules, collectProps } from "../utils/style";

const relevantProps = ["color"];

export default function getStyle(instance) {
  const result = renderToRules("font", "span", collectProps(instance, relevantProps));
  return result.join(" ");
}
