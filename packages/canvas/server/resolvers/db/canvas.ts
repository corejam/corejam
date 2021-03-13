import { ID } from "@corejam/base/src/typings/DB";
import { CanvasPage } from "../../../shared/types/Canvas";
import { Canvas } from "../../models/Canvas";

export default {
  allCanvasPages: () => {
    return Canvas.list();
  },

  canvasPageById: (id: string) => {
    return Canvas.getById(id);
  },

  canvasPageByUrl: (slug: string) => {
    return Canvas.filter({
      seo: {
        url: slug,
      },
    })[0];
  },

  canvasPageCreate: (canvasPageInput: CanvasPage) => {
    const canvas = new Canvas();
    return canvas.assignData(canvasPageInput).save();
  },

  canvasPageEdit: async (id: ID, canvasPageInput: CanvasPage) => {
    const canvas = await Canvas.getById(id);
    canvas.assignData(canvasPageInput);

    return canvas.update();
  },
};
