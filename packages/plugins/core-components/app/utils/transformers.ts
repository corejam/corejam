import borderRadius from "./transform/border/radius";
import fontWeight from "./transform/font/weight";
import fontSize from "./transform/font/size";
import fontStyle from "./transform/font/style";
import fontSpacing from "./transform/font/spacing";
import fontDecoration from "./transform/font/decoration";
import fontTransform from "./transform/font/transform";
import fontAlign from "./transform/font/align";
import fontLineHeight from "./transform/font/lineHeight";
import padding from "./transform/spacing/padding";
import margin from "./transform/spacing/margin";
import height from "./transform/sizing/height";
import minHeight from "./transform/sizing/minHeight";
import maxWidth from "./transform/sizing/maxWidth";
import templateColumns from "./transform/grid/templateColumns";
import templateRows from "./transform/grid/templateRows";
import gridGap from "./transform/grid/gap";
import autoFlow from "./transform/grid/autoFlow";
import gridColumns from "./transform/grid/columns";
import gridRows from "./transform/grid/rows";
import columnsStartEnd from "./transform/grid/columnsStartEnd";
import rowsStartEnd from "./transform/grid/rowsStartEnd";
import grid from "./transform/grid/grid";
import position from "./transform/layout/position";
import display from "./transform/layout/display";
import objectFit from "./transform/layout/objectFit";
import zIndex from "./transform/layout/zIndex";
import flex from "./transform/flex/flex";
import justify from "./transform/flex/justify";
import width from "./transform/sizing/width";
import borderWidth from "./transform/border/width";
import outline from "./transform/interactivity/outline";
import backgroundColor from "./transform/backgrounds/color";
import fontColor from "./transform/font/color";
import borderColor from "./transform/border/color";
import flexDirection from "./transform/flex/direction";

/**
 * Modify components api to correct css.
 *
 * @param property
 * @param value
 */
function modValue(property: string, value: string) {
  const map = {
    display: display,
    flex: flex,
    direction: flexDirection,
    justify: justify,
    w: width,
    h: height,
    "min-h": minHeight,
    p: padding,
    pt: padding,
    pr: padding,
    pb: padding,
    pl: padding,
    px: padding,
    py: padding,
    m: margin,
    mt: margin,
    mr: margin,
    mb: margin,
    ml: margin,
    mx: margin,
    my: margin,
    max: maxWidth,
    bg: backgroundColor,
    hide: (_value) => display("none"),
    "b-color": borderColor,
    color: fontColor,
    rounded: borderRadius,
    "rounded-top": borderRadius,
    "rounded-right": borderRadius,
    "rounded-bottom": borderRadius,
    "rounded-left": borderRadius,
    "b-width": borderWidth,
    "b-width-top": borderWidth,
    "b-width-right": borderWidth,
    "b-width-bottom": borderWidth,
    "b-width-left": borderWidth,
    top: position,
    right: position,
    bottom: position,
    left: position,
    size: fontSize,
    weight: fontWeight,
    "font-style": fontStyle,
    "line-height": fontLineHeight,
    spacing: fontSpacing,
    decoration: fontDecoration,
    transform: fontTransform,
    align: fontAlign,
    "template-columns": templateColumns,
    "template-rows": templateRows,
    cols: gridColumns,
    "cols-start": columnsStartEnd,
    "cols-end": columnsStartEnd,
    rows: gridRows,
    "rows-start": rowsStartEnd,
    "rows-end": rowsStartEnd,
    gap: gridGap,
    "gap-col": gridGap,
    "gap-row": gridGap,
    "auto-flow": autoFlow,
    grid: grid,
    fit: objectFit,
    "max-width": maxWidth,
    z: zIndex,
    outline: outline,
  };
  return map[property] ? map[property](value) : value;
}

export const getTransformedValue = (property, value) => {
  try {
    const val = modValue(property, value);
    return val;
  } catch (e) {
    return "";
  }
};
