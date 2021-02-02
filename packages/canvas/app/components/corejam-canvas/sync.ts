export function toJson(node: HTMLElement & Record<string, unknown>, deep = false) {
  if (node.nodeType === 1) {
    const propFix = { for: "htmlFor", class: "className" };
    const specialGetters = {
      style: (node: HTMLElement) => node.style.cssText,
    };
    const obj: any = {
      // currently we deal only with element node types
      // nodeType: node.nodeType,
    };
    obj["__node"] = node;

    if (node.tagName) {
      obj.tagName = node.tagName.toLowerCase();
    } else if (node.nodeName) {
      obj.nodeName = node.nodeName;
    }
    if (node.nodeValue) {
      obj.nodeValue = node.nodeValue;
    }

    if (["span", "p", "h1", "h2", "h3", "h4", "h5"].includes(obj.tagName)) {
      obj.innerValue = node.innerHTML;
    }

    const attrs = node.attributes;
    if (attrs) {
      const defaultValues = new Map();
      for (let i = 0; i < attrs.length; i++) {
        const name = attrs[i].nodeName;
        if (!["class", "style"].includes(name)) defaultValues.set(name, attrs[name]);
      }

      const arr = [];
      for (const [name, defaultValue] of defaultValues) {
        const propName = propFix[name] || name;
        const specialGetter = specialGetters[propName];
        const value = specialGetter ? specialGetter(node) : node[propName];
        if (value !== defaultValue) {
          arr.push([name, value]);
        }
      }
      if (arr.length) {
        obj.attributes = arr;
      }
    }

    const childNodes = node.childNodes;
    // Don't process children for a textarea since we used `value` above.
    if (obj.tagName !== "textarea" && childNodes && childNodes.length) {
      const arr = (obj.childNodes = []);
      for (let i = 0; i < childNodes.length; i++) {
        if (childNodes[i].nodeType === 1) arr.push(this.toJson(childNodes[i] as any, true));
      }
    }

    return !deep ? [obj] : obj;
  }
}

// export function renderToDOM() {
//   if (this.canvasJson) {
//     const render = (node: any) => {
//       if (node.innerValue) return node.innerValue;
//       const Element = node.tagName;
//       const props = {};
//       if (node.attributes) {
//         for (let length = node.attributes.length, i = 0; i < length; i++) {
//           props[node.attributes[i][0]] = node.attributes[i][1];
//         }
//         return <Element {...props}>{node.childNodes.map(render)}</Element>;
//       }
//       return <Element>{node.childNodes.map(render)}</Element>;
//     };
//     return render(this.canvasJson[0]);
//   }
// }
