import { canvasService, sendEventToMachine } from "./canvas.machine";

/**
 *
 * @param tag
 *
 * Helper function to create dom nodes and hook to append meta info to these node.
 *
 */
export const createNewNode = (instance: HTMLElement) => {
  const cmp = JSON.parse(instance.dataset["cmp"]);
  const newNode = document.createElement(cmp.component);
  newNode.setAttribute("key", cmp.component + JSON.stringify(cmp.props));
  Object.keys(cmp.props).forEach((k) => newNode.setAttribute(k, cmp.props[k]));
  if (cmp.component.includes("type")) newNode.innerText = "Dummy text";
  newNode.addEventListener("pointerdown", (event) => canvasService.send(event), { passive: true });
  return newNode;
};

/**
 *
 * @param node; String
 *
 * Highlight a given dom node
 */
export const highlight = (node: HTMLElement) => {
  if (node.localName.includes("corejam") && !node.localName.includes("type")) {
    node.style.background = "var(--cj-colors-blue-100)";
    node.style.outline = "1px solid black";
  }
};

/**
 *
 * @param node: HTMLElement
 * @param ev: boolean
 *
 * Remove highlight from given domnode and potentially remove event listener.
 */
export const removeHighlight = (node: HTMLElement, ev = true) => {
  node.style.removeProperty("background");
  node.style.removeProperty("outline");
  if (ev) {
    node.removeEventListener("pointerover", sendEventToMachine, true);
  }
};

/**
 *
 * @param node : HTMLElement
 *
 * Highlight a potential drop node with more ui feedback
 */
export const highlightDrop = (node: HTMLElement) => {
  const blacklist = ["corejame-type", "span", "h1", "h2", "h3", "h4", "h5", "h6", "p"];
  if (!blacklist.includes(node.localName)) node.style.background = "var(--cj-colors-blue-300)";
};

/**
 *
 * @param node : HTMLElement
 *
 * Remove highlight from potential drop element.
 */
export const removeHighlightDrop = (node: HTMLElement) => {
  const blacklist = ["corejame-type", "span"];
  if (!blacklist.includes(node.localName)) node.style.background = "var(--cj-colors-blue-100)";
};
