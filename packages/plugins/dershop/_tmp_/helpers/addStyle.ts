import { getElement } from "@stencil/core";

/**
 * Call this function as soon as the click outside of annotated method's host is done.
 * @example
```
@ClickOutside()
callback() {
  // this will run when click outside of element (host component) is done.
}
```
 */
export function addStyle() {
  console.log("hi");
  return (proto: any, methodName: string) => {
    const { render } = proto;
    proto.render = function () {
      const renderResult = render.call(this);
      const host = getElement(this);
      const method = this[methodName];
      console.log(renderResult, host, method);
      return renderResult;
    };
  };
}
