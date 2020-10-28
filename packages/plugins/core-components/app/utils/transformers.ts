import { isBoolean } from "./utils";
import { breakpointValues } from "./config";
import {
  borderRadiusTransform,
  color,
  boxModell,
  margin,
  fontSize,
  fontStyle,
  fontSpacing,
  fontDecoration,
  fontTransform,
  fontAlign,
  gridTemplateValues,
  gridColumns,
  gridColumnsStart,
  gridColumnsEnd,
  gridRows,
  gridRowsValue,
  gridGap,
  autoFlow,
  grid,
  objectFit,
  maxWidth,
  display,
  fontWeight,
  fontLineHeight,
  justify,
  width,
} from "./propertyTransformers";

/**
 * Modify components api to correct css.
 *
 * @param property
 * @param value
 */
function modValue(property: string, value: string) {
  const map = {
    display: display,
    flex: (value) => (isBoolean(value) ? "flex" : ""),
    direction: (val) => val.replace("col", "column"),
    justify: justify,
    w: width,
    h: (value) => value,
    "min-h": (value) => value,
    p: boxModell,
    pt: boxModell,
    pr: boxModell,
    pb: boxModell,
    pl: boxModell,
    px: boxModell,
    py: boxModell,
    m: margin,
    mt: margin,
    mr: margin,
    mb: margin,
    ml: margin,
    mx: margin,
    my: margin,
    max: (value) => breakpointValues[value],
    bg: color,
    hide: (value) => {
      return isBoolean(value) && !!value ? "none" : "initial";
    },
    show: (value) => (isBoolean(value) && !!value ? "initial" : value),
    "b-color": color,
    color: color,
    rounded: borderRadiusTransform,
    "rounded-top": borderRadiusTransform,
    "rounded-right": borderRadiusTransform,
    "rounded-bottom": borderRadiusTransform,
    "rounded-left": borderRadiusTransform,
    "b-width": (value) => value + "px",
    "b-width-top": (value) => value + "px",
    "b-width-right": (value) => value + "px",
    "b-width-bottom": (value) => value + "px",
    "b-width-left": (value) => value + "px",
    top: (value) => value + "px",
    right: (value) => value + "px",
    bottom: (value) => value + "px",
    left: (value) => value + "px",
    size: fontSize,
    "font-weight": fontWeight,
    "font-style": fontStyle,
    "line-height": fontLineHeight,
    spacing: fontSpacing,
    decoration: fontDecoration,
    transform: fontTransform,
    align: fontAlign,
    "template-columns": gridTemplateValues,
    "template-rows": gridTemplateValues,
    cols: gridColumns,
    colsStart: gridColumnsStart,
    colsEnd: gridColumnsEnd,
    rows: gridRows,
    "rows-start": gridRowsValue,
    "rows-end": gridRowsValue,
    gap: gridGap,
    "gap-col": gridGap,
    "gap-row": gridGap,
    "auto-flow": autoFlow,
    grid: grid,
    fit: objectFit,
    "max-width": maxWidth,
    z: (value) => value,
    outline: (value) => value,
  };
  return map[property] ? map[property](value) : value;
}

export const getTransformedValue = (property, value) => {
  //   if (isBoolean(value)) return property;
  try {
    const val = modValue(property, value);
    return val;
  } catch (e) {
    return "";
  }
};
