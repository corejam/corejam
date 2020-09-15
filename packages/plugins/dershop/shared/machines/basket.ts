import { createMachine, assign } from "@xstate/fsm";
type BasketStateSchema =
  | {
      value: "idle";
      context: BasketContext;
    }
  | {
      value: "initialized";
      context: BasketContext;
    }
  | {
      value: "address";
      context: BasketContext;
    }
  | {
      value: "payment";
      context: BasketContext;
    }
  | {
      value: "confirmation";
      context: BasketContext;
    };
interface BasketContext {
  initialized?: boolean | string;
  items?: any;
  subTotal?: number;
  shipping?: number;
  orderTotal?: number;
}

// Fix issue with importing types from api and not including graphql
type ProductCartItem = any;

type CartEvent =
  | { type: "ADDITEM"; item: ProductCartItem }
  | { type: "EDITITEM"; item: ProductCartItem }
  | { type: "ADD_ADDRESS" }
  | { type: "ADDPAYMENT" }
  | { type: "CONFIRM" }
  | { type: "FINALIZE" }
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
          ADD_ADDRESS: [
            { target: "address", cond: (ctx) => ctx.items.length > 0 },
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
          CLEAR: {
            target: "idle",
            actions: "reset",
          },
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
          FINALIZE: {
            target: "idle",
            actions: "reset",
          },
          CLEAR: {
            target: "idle",
            actions: "reset",
          },
        },
      },
    },
  },
  {
    actions: {
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
