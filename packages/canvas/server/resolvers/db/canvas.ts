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
      return filter[0];
    }

    return null;
  },

  canvasPageCreate: async (canvasPageInput: CanvasPage) => {
    const canvas = await new Canvas().assignData(canvasPageInput);
    return canvas.save();
  },

  canvasPageEdit: async (id: ID, canvasPageInput: CanvasPage) => {
    const canvas = await Canvas.getById(id);
    await canvas.assignData(canvasPageInput);

    return canvas.update();
  },
};
