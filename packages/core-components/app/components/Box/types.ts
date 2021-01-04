export namespace Flex {
  export type Flex = boolean;
  export type Direction = "row" | "col" | "row-reverse" | "col-reverse";

  export type AlignItems = "start" | "end" | "center" | "baseline" | "stretch";

  export type AlignContent = "center" | "start" | "end" | "between" | "around";

  export type Self = "auto" | "start" | "center" | "end" | "stretch";

  export type Justify = "start" | "center" | "end" | "between" | "around" | "evenly";

  export type Wrap = "wrap" | "no-wrap" | "wrap-reverse";

  export type Flow = "row" | "row-reverse" | "column" | "column-reverse";
}

export type Position = "static" | "relative" | "absolute" | "sticky" | "fixed";

export type Display = "block" | "flex" | "inine" | "none";
