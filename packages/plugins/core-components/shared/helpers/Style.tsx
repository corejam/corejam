import { h, FunctionalComponent } from "@stencil/core";

export const Style: FunctionalComponent<{ styles: string; hash?: string }> = ({ styles, hash }) => {
  if (styles) return <style data-hash={hash}>{styles}</style>;
  return "";
};
