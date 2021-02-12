export default {
  Query: {
    objectFromURL: (_obj: any, args: any, ctx: any) => {
      return ctx.models.objectFromURL(args.url);
    },
  },
  Paginated: {
    __resolveType(_obj: any, _args: any, _ctx: any) {
      return null;
    },
  },
  Timestamp: {
    __resolveType(_obj: any, _args: any, _ctx: any) {
      return null;
    },
  },
};
