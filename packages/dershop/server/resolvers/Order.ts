import { OrderList } from "../../shared/types/Order";
import { UserDB } from "../../shared/types/User";
import OrderConfirmation from "../mail/OrderConfirmation";
import { MergedServerContext } from "../types/PluginResolver";

export default {
  Mutation: {
    orderCreate: async (_obj: any, args: any, { models, user, notify }: MergedServerContext) => {
      if (!user) {
        throw new Error("missing user");
      }

      const orderUser = ((await user()) as unknown) as UserDB;
      const order = await models.orderCreate(args.orderInput, orderUser);

      await notify.sendMail(new OrderConfirmation(order));

      return order;
    },
    orderUpdate: (_obj: any, _args: any, _ctx: MergedServerContext) => {
      //return models.updateOrder(args.id, args.orderInput);
    },
  },
  Query: {
    allOrders: (_obj: any, _args: any, ctx: MergedServerContext) => {
      return ctx.models.allOrders();
    },
    paginateOrders: async (_obj: any, { size, page }, { models }: any) => {
      const offset = (page - 1) * size;

      const allOrders = await models.allOrders();
      const items = allOrders.slice(offset, offset + size);

      const paginated: OrderList = {
        currentPage: page,
        totalItems: allOrders.length,
        lastPage: Math.ceil(allOrders.length / size),
        perPage: size,
        items: items,
      };

      return new Promise((res) => res(paginated));
    },
    /*
    ordersByCustomer: (_obj: any, _args: any, { models, user }: MergedServerContext) => {
      if (!user) throw new Error("Not Authenticated");

      return models.ordersByCustomer(user);
    }, */
    orderById: (_obj: any, { id }, ctx: any) => {
      return ctx.models.orderById(id);
    },
  },
};
