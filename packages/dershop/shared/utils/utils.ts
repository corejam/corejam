import { ComponentInterface } from "@stencil/core";

const BLACKLIST = ["href", "src", "name", "placeholder", "label", "formId", "type", "droppableElements"];

export function getClasses(component: ComponentInterface): string {
  const proto = Reflect.getPrototypeOf(component);
  // console.time(`${proto.constructor.name} classes generation`);
  const classes = Object.keys(proto.constructor.prototype).map((styleProp) => {
    if (!component[styleProp]) return;
    if (BLACKLIST.includes(styleProp)) return;
    if (typeof component[styleProp] === "boolean") return styleProp;
    return `${styleProp}-${component[styleProp]}`;
  });
  // console.timeEnd(`${proto.constructor.name} classes generation`);
  return classes.join(" ");
}

export function serialize(canvasId) {
  const targetNode = Array.from<HTMLElement>(document.querySelectorAll("dershop-canvas"))
    .filter((n) => n.getAttribute("canvas-id") === canvasId)[0]
    .shadowRoot.querySelector(".drop");
  const children = targetNode.classList.contains("drop") ? Array.from(targetNode.children) : [targetNode];
  const BLACKLIST = ["class", "style"];
  const serial = {
    name: window.location.pathname,
    date: Date.now(),
    items: [],
  };
  const liveDebug = false;
  const generate = (node: HTMLElement) => {
    if (node.localName.indexOf("dershop") > -1) {
      const entry = {
        tag: node.nodeName.toLowerCase(),
      };
      if (liveDebug) {
        entry["el"] = node;
      }
      if (node.hasAttributes()) {
        const properties = [];
        for (let i = node.attributes.length - 1; i >= 0; i--) {
          if (!BLACKLIST.includes(node.attributes[i].localName))
            properties.push({
              name: node.attributes[i].localName,
              value: node.attributes[i].nodeValue == "" ? true : node.attributes[i].nodeValue,
            });
        }
        if (properties.length > 0) entry["properties"] = properties;
      }
      if (node.children) {
        const items = [];
        Array.from(node.children).forEach((child: HTMLElement) => {
          const t = generate(child);
          if (t) items.push(t);
        });
        if (items.length > 0) entry["items"] = items;
      }
      if (node.shadowRoot && node.shadowRoot.children) {
        const items = [];
        Array.from(node.shadowRoot.children).forEach((child: HTMLElement) => {
          const t = generate(child);
          if (t) items.push(t);
        });
        if (items.length > 0) entry["items"] = items;
      }
      return entry;
    }
  };
  children.forEach((child: HTMLElement) => {
    const s = generate(child);
    if (s) serial["items"].push(s);
  });
  const evt = new CustomEvent("serializedCanvas", { detail: serial });
  document.dispatchEvent(evt);
}
