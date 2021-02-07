import { CanvasPageList } from "../../shared/types/Canvas";
import { MergedServerContext } from "../../shared/types/PluginResolver";

export default {
  Query: {
    allCanvasPages: (_obj: any, _args: any, { models }: MergedServerContext) => {
      return models.allCanvasPages();
    },
    paginateCanvasPages: async (_obj: any, { size, page }, { models }) => {
      const offset = (page - 1) * size;

      const allCanvasPages = models.allCanvasPages();
      const items = allCanvasPages.slice(offset, offset + size);

      const paginated: CanvasPageList = {
        currentPage: page,
        totalItems: allCanvasPages.length,
        lastPage: Math.ceil(allCanvasPages.length / size),
        perPage: size,
        items: items,
      };

      return new Promise((res) => res(paginated));
    },
    canvasPageById: (_obj: any, args: any, { models }: MergedServerContext) => {
      return models.canvasPageById(args.id);
    },
    canvasPollPeers: (_obj: any, { id }, { models }: MergedServerContext) => {
      return models.canvasPollPeers(id);
    },
  },
  Mutation: {
    canvasPageCreate: (_obj: any, { canvasPageInput }, { models }: MergedServerContext) => {
      return models.canvasPageCreate(canvasPageInput);
    },
    canvasPageEditSEO: () => {
      //return ctx.models.canvasPageEditSEO(args.id, args.seoInput);
    },
    canvasPageEdit: (_obj: any, { id, canvasPage }, { models }: MergedServerContext) => {
      return models.canvasPageEdit(id, canvasPage);
    },
    canvasOpenPeers: (_obj: any, { id, peerInput }, { models }: MergedServerContext) => {
      return models.canvasOpenPeers(id, peerInput);
    },
    canvasClosePeers: (_obj: any, { id }, { models }: MergedServerContext) => {
      return models.canvasClosePeers(id);
    },
  },
};
