import { coreState } from "@corejam/core-components";
import { authStore } from "@corejam/plugin-auth";
import { runState } from "@corejam/run";
import gql from "graphql-tag";
import { assign, createMachine } from "xstate";
import { orderCreateGQL } from "../../shared/graphql/Mutations/Order";
import type { OrderCreateInput } from "../../shared/types/Order";
import { Address } from "../types/Address";

export enum CheckoutStates {
  IDLE = "idle",
  INITIALIZED = "initialized",
  LOGIN_OR_REGISTER = "authenticate",
  ADDRESS = "address",
  PAYMENT = "payment",
  OVERVIEW = "overview",
  TRYORDER = "tryorder",
  THANKYOU = "thankyou",
}

export type CheckoutStatesSchema =
  | {
      value: CheckoutStates.IDLE;
      context: CheckoutContext;
    }
  | {
      value: CheckoutStates.INITIALIZED;
      context: CheckoutContext;
    }
  | {
      value: CheckoutStates.LOGIN_OR_REGISTER;
      context: CheckoutContext;
    }
  | {
      value: CheckoutStates.ADDRESS;
      context: CheckoutContext;
    }
  | {
      value: CheckoutStates.PAYMENT;
      context: CheckoutContext;
    }
  | {
      value: CheckoutStates.TRYORDER;
      context: CheckoutContext;
    }
  | {
      value: CheckoutStates.THANKYOU;
      context: CheckoutContext;
    };
interface CheckoutContext {
  initialized?: boolean | string;
  items?: any;
  subTotal?: number;
  shipping?: number;
  orderTotal?: number;
  address?: Address;
  errors?: any;
}

// Fix issue with importing types from api and not including graphql
type ProductCartItem = any;

type CheckoutEvent =
  | { type: "ADDITEM"; item: ProductCartItem }
  | { type: "NEXT_STEP"; data?: any }
  | { type: "EDITITEM"; item: ProductCartItem }
  | { type: "CHECKOUT" }
  | { type: "ADD_ADDRESS"; data: any }
  | { type: "ADDPAYMENT" }
  | { type: "CONFIRM" }
  | { type: "CLEAR" };

export const basketMachine = createMachine<CheckoutContext, CheckoutEvent, CheckoutStatesSchema>(
  {
    id: "checkout",
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
        entry: "reset",
        on: {
          ADDITEM: {
            target: CheckoutStates.INITIALIZED,
            actions: ["addItemToBasket", "calculateBasket"],
          },
        },
      },
      initialized: {
        on: {
          ADDITEM: {
            actions: ["addItemToBasket", "calculateBasket"],
          },
          NEXT_STEP: [
            {
              target: CheckoutStates.ADDRESS,
              cond: (ctx) => ctx.items.length > 0 && authStore.identity,
            },
            {
              target: CheckoutStates.LOGIN_OR_REGISTER,
              cond: (ctx) => ctx.items.length > 0 && !authStore.identity,
            },
          ],
          CLEAR: {
            target: CheckoutStates.IDLE,
          },
        },
      },
      authenticate: {
        on: {
          NEXT_STEP: {
            target: CheckoutStates.ADDRESS,
            cond: (ctx) => ctx.items.length > 0 && authStore.identity,
          },
          ADDITEM: {
            actions: ["addItemToBasket", "calculateBasket"],
          },
        },
      },
      address: {
        on: {
          ADDITEM: {
            actions: ["addItemToBasket", "calculateBasket"],
          },
          NEXT_STEP: {
            target: CheckoutStates.PAYMENT,
            actions: "addAddress",
          },
          CLEAR: {
            target: CheckoutStates.IDLE,
          },
        },
      },
      payment: {
        on: {
          ADDITEM: {
            actions: ["addItemToBasket", "calculateBasket"],
          },
          NEXT_STEP: {
            target: CheckoutStates.OVERVIEW,
          },
          CLEAR: {
            target: CheckoutStates.IDLE,
          },
        },
      },
      overview: {
        on: {
          ADDITEM: {
            actions: ["addItemToBasket", "calculateBasket"],
          },
          CONFIRM: {
            target: CheckoutStates.TRYORDER,
            actions: "submitOrder",
          },
          CLEAR: {
            target: CheckoutStates.IDLE,
          },
        },
      },
      tryorder: {
        invoke: {
          src: (context) => {
            const input: OrderCreateInput = {
              // items: context.items,
              items: [
                {
                  product: {
                    id: context.items[0].id,
                    name: context.items[0].name,
                  },
                  price: {
                    gross: context.items[0].price.gross,
                    tax_rate: 19,
                    net: context.items[0].price.gross,
                  },
                  quantity: context.items[0].quantity,
                },
              ],
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
                tax_rate: 19,
              },
            };

            //TODO move this to the order confirmation page.
            return coreState.client.mutate({
              mutation: gql(orderCreateGQL),
              variables: {
                orderInput: input,
              },
            });
          },
          onDone: {
            target: CheckoutStates.THANKYOU,
          },
          onError: {
            target: CheckoutStates.OVERVIEW,
            actions: assign({ errors: (_context, event) => event.data }),
          },
        },
      },
      thankyou: {
        entry: () => runState.router.push("/thankyou"),
        on: {
          "": [
            {
              target: CheckoutStates.IDLE,
            },
          ],
        },
      },
    },
  },
  {
    actions: {
      addItemToBasket: assign({
        initialized: (context) => (context.initialized ? context.initialized : new Date().toISOString()),
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
        address: (_context, event: any) => {
          const data: any = event.data;
          return {
            country: data.country.value,
            state: data.address.value,
            street: data.address.value,
            street_2: data.address.value,
            zipCode: data.zipCode.value,
            city: data.address.value,
          };
        },
      }),
      editItemInBasket: assign({}),
      calculateBasket: assign({
        subTotal: (context: CheckoutContext) =>
          context.items.reduce((acc, curr) => curr.price.net * curr.quantity + acc, 0),
        orderTotal: (context: CheckoutContext) =>
          context.items.reduce((acc, curr) => curr.price.net * curr.quantity + acc, context.shipping),
      }),
      reset: assign({
        initialized: false,
        items: [],
      }),
    },
  }
);
