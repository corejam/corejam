type genericScale = 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12 | 16 | 32 | 64;

/**
 * Font properties
 */

export namespace Font {
  export type Family = "sans" | "serif" | "mono";
  export type Weight = "hairline" | "thin" | "normal" | "medium" | "semibold" | "bold" | "extrabold" | "black";
  export type Size = "xs" | "sm" | "base" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "6xl";
  export type Smoothnes = "antialiased" | "subpixel-antialiased";
  export type Style = "italic" | "not-italic";
  export type Spacing = "tighter" | "tight" | "normal" | "wide" | "wider" | "widest";
  export type Decoration = "underline" | "line-through" | "no-underline";
  export type Transform = "uppercase" | "lowercase" | "capitalize" | "normal-case";
  export type Align = "left" | "center" | "right";
  export type As = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "span" | "p" | "b" | "i";
  export type lineHeight = "none" | "tight" | "snug" | "normal" | "relaxed" | "loose" | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
}

export namespace General {
  export type Color = string;

  /**
   * Prop for _transforming_ generic component in user defined HTMLNode
   */
}

export namespace Layout {
  export type Padding = genericScale;
}
