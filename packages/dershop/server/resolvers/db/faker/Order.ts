import { updateDates } from "@corejam/base";
import { random } from "faker";
import type { OrderCreateInput, OrderDB, OrderEditInput, OrderItem, OrderList } from "../../../../shared/types/Order";
import { UserDB } from "../../../../shared/types/User";
import { generateOrder, generateUser } from "./Generator";
import { allProducts } from "./Product";


export let orders: OrderDB[] = [];

try {
  const staticFile = require(process.cwd() + "/.corejam/faker.json")
  orders.push(...staticFile.orders)
  console.log("Load from static data")
} catch (e) {
  //Nothing for now
}

if (orders.length === 0) {
  const users: UserDB[] = [{ id: random.uuid(), ...generateUser() }];

  for (let index = 0; index < 10; index++) {
    users.push({ id: random.uuid(), ...generateUser() })
  }

  allProducts().then(products => {
    for (let index = 0; index < 10; index++) {
      orders.push({ id: random.uuid(), ...generateOrder(products, users) })
    }
  })
}

export function orderUpdate(id: string, orderInput: OrderEditInput): Promise<OrderDB> {
  let order = orders.filter((order: OrderDB) => {
    return order.id === id;
  })[0];

  order = { ...order, ...orderInput };

  orders = orders.map((order: OrderDB) => {
    if (order.id === id) {
      order = { ...order, ...orderInput };
    }
    return order;
  });

  return new Promise((res) => res(order));
}

export function orderCreate(
  orderInput: OrderCreateInput,
  user: UserDB
): Promise<OrderDB> {
  const order: OrderDB = {
    id: random.uuid(),
    status: 'RECEIVED',
    user: user,
    items: orderInput.items as [OrderItem],
    addressBilling: orderInput.addressBilling,
    addressShipping: orderInput.addressShipping,
    price: orderInput.price,
    ...updateDates(),
  }
  orders.push(order)

  return new Promise((res) => res(order))
}

export function allOrders(): Promise<OrderDB[]> {
  return new Promise((res) => res(orders));
}

export function orderById(id: string): Promise<OrderDB | null> {
  const order = orders.filter((order) => order.id === id)[0];
  return new Promise((res) => res(order));
}

export function ordersByCustomer(user: UserDB): Promise<OrderList> {
  const userOrders = [] as unknown as [OrderDB]
  orders.filter((order: OrderDB) => {
    if (order.user.id == user.id) {
      userOrders.push(order)
    }
  })

  const list: OrderList = {
    items: userOrders,
    totalItems: userOrders.length,
    lastPage: 1,
    currentPage: 1,
    perPage: 24,
  }

  return new Promise((res) => res(list))
}