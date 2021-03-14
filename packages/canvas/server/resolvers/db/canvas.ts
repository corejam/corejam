import { ID } from "@corejam/base/src/typings/DB";
import { CanvasPage } from "../../../shared/types/Canvas";
import { Canvas } from "../../models/Canvas";

export default {
  allCanvasPages: async () => {
    return await Canvas.list();
  },

  canvasPageById: async (id: string) => {
    return await Canvas.getById(id);
  },

  canvasPageByUrl: async (slug: string) => {
    const filter = await Canvas.filter({
      seo: {
        url: slug,
      },
    });

    if (filter && filter.length) {
      return filter[0]
    }

    return null;
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
