export function serialize() {
  const targetNode = document.querySelector("dershop-canvas").querySelector(".drop");
  const children = targetNode.classList.contains("drop") ? Array.from(targetNode.children) : [targetNode];
  const BLACKLIST = ["class", "style"];
  const serial = {
    name: window.location.pathname,
    date: Date.now(),
    items: [],
  };
  const liveDebug = false;
  const generate = (node: HTMLElement) => {
    if (node.localName.indexOf("corejam") > -1) {
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
      if (node && node.children) {
        const items = [];
        Array.from(node.children).forEach((child: HTMLElement) => {
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
