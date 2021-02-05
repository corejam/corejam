import { generateSeo } from "@corejam/base/dist/resolvers/db/faker/Generator";
import { date } from "faker";
import { CanvasPage } from "../../../../shared/types/Canvas";

export function generateCanvasPage({
  seo = generateSeo(),
  canvas = "<html><h1>This is the canvas<h1></html>",
  dateCreated = date.past(2).toISOString(),
  dateUpdated = date.past(1).toISOString(),
}): CanvasPage {
  return {
    seo: seo,
    canvas: canvas,
    dateCreated: dateCreated,
    dateUpdated: dateUpdated,
  };
}
