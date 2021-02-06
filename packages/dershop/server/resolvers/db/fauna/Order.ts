import { updateDates } from "@corejam/base";
import { FaunaClient } from "@corejam/base/dist/resolvers/db/fauna/Client";
import { query as q } from "faunadb";
import type { OrderDB, OrderEditInput } from "../../../../shared/types/Order";
import { OrderCreateInput, OrderList } from "../../../../shared/types/Order";
import { UserDB } from "../../../../shared/types/User";

export function orderUpdate(id: string, orderInput: OrderEditInput): Promise<OrderDB> {
  return FaunaClient()
    .query(q.Update(q.Ref(q.Collection("orders"), id), { data: { ...orderInput } }))
    .then((response: any) => {
      return response.data;
    });
}

export function orderById(id: string): Promise<OrderDB | null> {
  return FaunaClient()
    .query(
      q.Merge(
        {
          order: q.Get(q.Ref(q.Collection("orders"), id)),
        },
        {
          user: q.Get(q.Select(["data", "user"], q.Get(q.Ref(q.Collection("orders"), id)))),
        }
      )
    )
    .then((response: any) => {
      delete response.order.data.user;

      const parsed = {
        user: {
          id: response.user.ref.id,
          ...response.user.data,
        },
        ...response.order.data,
      };
      const res = {
        id: response.order.ref.id,
        ...parsed,
      };
      return res;
    });
}

export function orderCreate(orderInput: OrderCreateInput, user: UserDB): Promise<OrderDB> {
  return FaunaClient()
    .query(
      q.Create(q.Collection("orders"), {
        data: {
          ...orderInput,
          user: q.Ref(q.Collection("users"), user.id),
          ...updateDates(),
        },
      })
    )
    .then((response: any) => {
      return (orderById(response.ref.id) as unknown) as OrderDB;
    })
    .catch((e) => (console.log(e) as unknown) as OrderDB);
}

export function allOrders(): Promise<OrderDB[]> {
  return FaunaClient()
    .query(
      q.Map(
        q.Paginate(q.Match(q.Index("allOrders"))),
        q.Lambda(
          "x",
          q.Merge(q.Select("data", q.Get(q.Var("x"))), {
            id: q.Select(["ref", "id"], q.Get(q.Var("x"))),
            user: q.Select(
              ["data"],
              q.Get(q.Ref(q.Collection("users"), q.Select(["data", "user", "id"], q.Get(q.Var("x")))))
            ),
          })
        )
      )
    )
    .then((response: any) => {
      return response.data;
    });
}

export function ordersByCustomer(user: UserDB): Promise<OrderList> {
  return FaunaClient()
    .query(
      q.Map(
        q.Paginate(q.Match(q.Index("ordersByUser"), q.Ref(q.Collection("users"), user.id))),
        q.Lambda("x", q.Merge({ id: q.Select(["ref", "id"], q.Get(q.Var("x"))) }, q.Select("data", q.Get(q.Var("x")))))
      )
    )
    .then((response: any) => {
      const parsedResponse: OrderList = {
        items: response.data,
        totalItems: 1,
        currentPage: 1,
        lastPage: 1,
        perPage: 20,
      };

      return parsedResponse;
    });
}
