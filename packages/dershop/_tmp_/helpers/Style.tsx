import { h, FunctionalComponent } from "@stencil/core";

export const Style: FunctionalComponent<{ style: string; hash: string }> = ({ style, hash }) => {
  return (
    <style data-hash={hash}>{`
        ${style};
      `}</style>
  );
};
