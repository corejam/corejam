import { CanvasPageList } from "../typings/Canvas";
import { adminAllCanvasPagesGQL } from "../queries/Admin/CanvasPages";
import { ServerContext } from "../typings/Server";
import { GraphQLClient } from "../client/Client";

export default {
  Query: {
    allCanvasPages: (_obj: any, _args: any, { models }: ServerContext) => {
      return models.allCanvasPages();
    },
    paginateCanvasPages: async (_obj: any, { size, page }, _ctx: ServerContext) => {
      const client = new GraphQLClient();
      const offset = (page - 1) * size;

      const {
        data: { allCanvasPages },
      } = await client.request(adminAllCanvasPagesGQL);
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
    canvasPageById: (_obj: any, args: any, { models }: ServerContext) => {
      return models.canvasPageById(args.id);
    },
    canvasPollPeers: (_obj: any, { id }, { models }: ServerContext) => {
      return models.canvasPollPeers(id);
    },
  },
  Mutation: {
    canvasPageEditSEO: (_obj: any, _args: any, _ctx: ServerContext) => {
      //return ctx.models.canvasPageEditSEO(args.id, args.seoInput);
    },
    canvasPageEdit: (_obj: any, { id, canvasPage }, { models }: ServerContext) => {
      return models.canvasPageEdit(id, canvasPage);
    },
    canvasOpenPeers: (_obj: any, { id, peerInput }, { models }: ServerContext) => {
      return models.canvasOpenPeers(id, peerInput);
    },
    canvasClosePeers: (_obj: any, { id }, { models }: ServerContext) => {
      return models.canvasClosePeers(id);
    },
  },
};
