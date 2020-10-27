import { authStore } from "@corejam/plugin-auth";
import { assign, createMachine } from "@xstate/fsm";
import gql from "graphql-tag";
import { orderCreateGQL } from "../../shared/graphql/Mutations/Order";
import { OrderCreateInput } from "../../shared/types/Order";
import { Address } from "../types/Address";
import { state as routerState } from "@corejam/router"
import { coreState } from "@corejam/core-components";

export enum BasketStates {
  IDLE = "idle",
  INITIALIZED = "initialized",
  ADDRESS = "address",
  PAYMENT = "payment",
  CONFIRMATION = "confirmation",
  CONFIRMED = "confirmed"
}

export type BasketStateSchema =
  | {
    value: BasketStates.IDLE;
    context: BasketContext;
  }
  | {
    value: BasketStates.INITIALIZED;
    context: BasketContext;
  }
  | {
    value: BasketStates.ADDRESS;
    context: BasketContext;
  }
  | {
    value: BasketStates.PAYMENT;
    context: BasketContext;
  }
  | {
    value: BasketStates.CONFIRMATION;
    context: BasketContext;
  } | {
    value: BasketStates.CONFIRMED;
    context: BasketContext;
  };
interface BasketContext {
  initialized?: boolean | string;
  items?: any;
  subTotal?: number;
  shipping?: number;
  orderTotal?: number;
  address?: Address
}

// Fix issue with importing types from api and not including graphql
type ProductCartItem = any;

type CartEvent =
  | { type: "ADDITEM"; item: ProductCartItem }
  | { type: "EDITITEM"; item: ProductCartItem }
  | { type: "CHECKOUT" }
  | { type: "ADD_ADDRESS", data: any }
  | { type: "ADDPAYMENT" }
  | { type: "CONFIRM" }
  | { type: "CONFIRMED" }
  | { type: "CLEAR" };

export const basketMachine = createMachine<
  BasketContext,
  CartEvent,
  BasketStateSchema
>(
  {
    id: "order",
    initial: "idle",
    context: {
      initialized: false,
      items: [],
      subTotal: 0,
      shipping: 4.99,
      orderTotal: 4.99,
    },
    states: {
      idle: {
        on: {
          ADDITEM: {
            target: "initialized",
            actions: ["addItemToBasket", "calculateBasket"],
          },
        },
      },
      initialized: {
        on: {
          ADDITEM: {
            target: "initialized",
            actions: ["addItemToBasket", "calculateBasket"],
          },
          CHECKOUT: [
            {
              target: "address",
              cond: (ctx) => ctx.items.length > 0 && authStore.identity
            },
          ],
          CLEAR: {
            target: "idle",
            actions: "reset",
          },
        },
      },
      address: {
        on: {
          ADDITEM: {
            target: "address",
            actions: "addItemToBasket",
          },
          ADD_ADDRESS: {
            target: "payment",
            actions: "addAddress"
          },
          CLEAR: {
            target: "idle",
            actions: "reset",
          },
          ADDPAYMENT: {
            target: BasketStates.PAYMENT
          }
        },
      },
      payment: {
        on: {
          ADDITEM: {
            target: "payment",
            actions: "addItemToBasket",
          },
          CONFIRM: {
            target: "confirmation",
          },
          CLEAR: {
            target: "idle",
            actions: "reset",
          },
        },
      },
      confirmation: {
        on: {
          CONFIRMED: {
            target: "confirmed",
            actions: "submitOrder",
          },
          CLEAR: {
            target: "idle",
            actions: "reset",
          },
        },
      },
      confirmed: {
        entry: "reset"
      },
    },
  },
  {
    actions: {
      submitOrder: (context) => {

        const input: OrderCreateInput = {
          items: context.items,
          status: "SHIPPING",
          addressBilling: {
            ...context.address,
          },
          addressShipping: {
            ...context.address,
          },
          price: {
            net: context.orderTotal,
            gross: context.orderTotal,
            tax_rate: 19
          }
        };

        //TODO move this to the order confirmation page.
        coreState.client.mutate({
          mutation: gql(orderCreateGQL),
          variables: {
            orderInput: input,
          },
        }).then(request => {
          if (request.data.orderCreate) {
            routerState.router.push(`/account/order/${request.data.orderCreate.id}`);
          }
        });
      },
      addItemToBasket: assign({
        initialized: (context) =>
          context.initialized ? context.initialized : new Date().toISOString(),
        items: (context, event) => {
          if (event.type === "ADDITEM") {
            let found = false;
            const itemsCopy = context.items.slice();
            itemsCopy.forEach((item) => {
              if (item.name === event.item.name) {
                item.quantity += event.item.quantity;
                found = true;
              }
            });
            return found ? itemsCopy : [...context.items, event.item];
          }
        },
      }),
      addAddress: assign({
        address: (_context, event) => {
          if (event.type === "ADD_ADDRESS") {
            return {
              country: event.data.country.value,
              state: event.data.address.value,
              street: event.data.address.value,
              street_2: event.data.address.value,
              zipCode: event.data.zipCode.value,
              city: event.data.address.value
            }
          }
        }
      }),
      editItemInBasket: assign({}),
      calculateBasket: assign({
        subTotal: (context: BasketContext) =>
          context.items.reduce(
            (acc, curr) => curr.price.net * curr.quantity + acc,
            0
          ),
        orderTotal: (context: BasketContext) =>
          context.items.reduce(
            (acc, curr) => curr.price.net * curr.quantity + acc,
            context.shipping
          ),
      }),
      reset: assign({
        initialized: false,
        items: [],
      }),
    },
  }
);
