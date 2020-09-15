import { collectProps, renderToRules } from "../utils/style";

const relevantProps = ["p", "pt", "pr", "pb", "pl"];

export default function getStyle(instance) {
  const result = renderToRules("padding", "span", collectProps(instance, relevantProps));
  return result.join(" ");
}
