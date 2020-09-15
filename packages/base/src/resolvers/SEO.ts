export default {
  Query: {
    objectFromURL: (_obj: any, args: any, ctx: any) => {
      return ctx.models.objectFromURL(args.url);
    },
  },
};
