import { isBoolean } from "./utils";

export function width(value: string | number) {
  if (typeof value === "string") {
    if (value.indexOf("px") > -1) return value;
    return ((100 / 12) * parseInt(value)).toFixed(2) + "%";
  } else {
    return ((100 / 12) * value).toFixed(2) + "%";
  }
}

export function justify(value) {
  const valids = ["start", "center", "end", "between", "around", "evenly"];
  const transform = {
    start: "flex-start",
    end: "flex-end",
    center: "center",
    between: "space-between",
    around: "space-around",
    evenly: "space-evenly",
  };
  if (valids.includes(value)) {
    return transform[value];
  } else {
    throw new Error("No valid Prop");
  }
}

export function display(value) {
  const propertyValues = ["flex", "block", "inline"];
  if (propertyValues.includes(value)) return value;
  throw new Error("Prop not valid");
}

export function borderRadiusTransform(value) {
  const factor = 0.125;
  if (value === "none") return 0;
  if (isBoolean(value)) return 2 * factor + "rem";
  if (value === "sm") return factor + "rem";
  if (value === "md") return 3 * factor + "rem";
  if (value === "lg") return 4 * factor + "rem";
  if (value === "full") return "9999px";
}

export function color(value: string) {
  const [color, shade] = value.split("-");
  if (["black", "white"].includes(value)) return `var(--cj-color-${color})`;
  if (value.startsWith("--cj")) return `var(${value})`;
  if (!shade) return `var(--cj-color-${color}-500)`;
  return `var(--cj-color-${color}-${shade})`;
}

export function boxModell(value) {
  return `calc(var(--cj-box-multiplier, 0.25) * ${value}rem)`;
}

export function margin(value) {
  const propertyValues = ["auto", "initial", "inherit"];
  if (propertyValues.includes(value)) return value;
  return `calc(var(--cj-box-multiplier, 0.25) * ${value}rem)`;
}

export function fontSize(key) {
  const defaultSizes = {
    xs: "0.75rem",
    sm: "0.875rem",
    base: "1rem",
    lg: "1.125rem",
    xl: "1.25rem",
    "2xl": "1.5rem",
    "3xl": "1.875rem",
    "4xl": "2.25rem",
    "5xl": "3rem",
    "6xl": "4rem",
  };
  return `var(--cj-font-size-${key}, ${defaultSizes[key]})`;
}

export function fontStyle(value) {
  if (value === "italic" || value === "non-italic") return value;
  throw new Error("Prop not valid");
}

export function fontSpacing(value) {
  const defaults = {
    tighter: "-0.05em",
    tight: "-0.025em",
    normal: "0",
    wide: "0.025em",
    wider: "0.05em",
    widest: "0.1em",
  };
  const validValues = ["tighter", "tight", "normal", "wide", "wider", "widest"];
  if (validValues.includes(value)) return `var(--cj-font-spacing-${value}, ${defaults[value]})`;
}
export function fontLineHeight(value) {
  const defaults = {
    none: "1",
    tight: "1.25",
    snug: "1.375",
    normal: "1.5",
    relaxed: "1.625",
    loose: "2",
    "3": ".75rem",
    "4": "1rem",
    "5": "1.25rem",
    "6": "1.5rem",
    "7": "1.75rem",
    "8": "2rem",
    "9": "2.25rem",
    "10": "2.5rem",
  };
  const validValues = ["none", "tight", "snug", "normal", "relaxed", "loose", 3, 4, 5, 6, 7, 8, 9, 10];
  if (validValues.includes(value)) return `var(--cj-font-line-height-${value}, ${defaults[value]})`;
}

export function fontWeight(value) {
  const defaults = {
    hairline: "100",
    thin: "200",
    light: "300",
    normal: "400",
    medium: "500",
    semibold: "600",
    bold: "700",
    extrabold: "800",
    black: "900",
  };
  const valids = ["hairline", "thin", "normal", "medium", "semibold", "bold", "extrabold", "black"];
  if (valids.includes(value)) `var(--cj-font-weight-${value}, ${defaults[value]})`;
  throw new Error("Prop not valid");
}

export function fontDecoration(value: string) {
  const valids = ["underline", "line-through", "no-underline", "none"];
  if (value.startsWith("--cj")) return `var(${value})`;
  if (valids.includes(value)) return value === "no-underline" ? "none" : value;
  throw new Error("Prop not valid");
}

export function fontTransform(value) {
  const valids = ["uppercase", "lowercase", "capitalize", "normal-case"];
  if (valids.includes(value)) return value === "normal-case" ? "none" : value;
  throw new Error("Prop not valid");
}

export function fontAlign(value) {
  const valids = ["left", "center", "right"];
  if (valids.includes(value)) return value === "normal-case" ? "none" : value;
  throw new Error("Prop not valid");
}

export function gridTemplateValues(value) {
  if (isNaN(value) && value !== "none") throw new Error("Prop not valid");
  return value === "none" ? "none" : `repeat(${value}, minmax(0, 1fr))`;
}

export function gridColumns(value) {
  if (isNaN(value) && value !== "auto") throw new Error("Prop not valid");
  return value === "auto" ? "auto" : `span ${value} / span ${value}`;
}

export function gridColumnsStart(value) {
  if (isNaN(value) && value !== "auto") throw new Error("Prop not valid");
  return value === "auto" ? "auto" : `${value}`;
}

export function gridColumnsEnd(value) {
  if (isNaN(value) && value !== "auto") throw new Error("Prop not valid");
  return value === "auto" ? "auto" : `${value}`;
}

export function gridRows(value) {
  if (isNaN(value) && !["none", "auto"].includes(value)) throw new Error("Prop not valid");
  return isNaN(value) ? value : `span ${value} / span ${value}`;
}

export function gridRowsValue(value) {
  if (isNaN(value) && value !== "auto") throw new Error("Prop not valid");
  return value === "auto" ? "auto" : `${value}`;
}

export function gridGap(value) {
  return value === "0" ? "0" : `calc(var(--cj-grid-multiplier, 0.25) * ${value}rem)`;
}

export function autoFlow(value) {
  const valids = ["row", "column", "row-dense", "column-dense"];
  if (valids.includes(value)) return value;
  throw new Error("Prop not valid");
}

export function grid(value) {
  return value ? "grid" : "initial";
}

export function maxWidth(value) {
  return `${value}%`;
}

export function objectFit(value) {
  const valids = ["cover"];
  if (valids.includes(value)) return value;
  throw new Error("Prop not valid");
}
