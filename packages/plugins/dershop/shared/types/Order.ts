import { DBDocument, Paginated, Timestamp } from "@corejam/base/dist/typings/Utils";
import { Address, AddressInput } from "./Address";
import { Price } from "./Price";
import { UserDB } from "./User";

export type Order = Timestamp & {
  user: UserDB,
  status: OrderStatus;
  items: OrderItem[];
  dateCreated: string;
  dateUpdated: string;
  addressBilling: Address;
  addressShipping: Address;
  price: Price;
};

export type OrderCreateInput = {
  status: OrderStatus;
  items: OrderItemInput[];
  addressBilling: AddressInput;
  addressShipping: AddressInput;
  price: Price;
};

export type OrderEditInput = Partial<OrderCreateInput>;
export type OrderItemInput = OrderItem;
export type OrderDB = Order & DBDocument;

export type OrderItem = {
  product: OrderProduct;
  quantity: number;
  price: Price;
};

export type OrderProduct = {
  id: string,
  name: string,
}

export type OrderList = Paginated & {
  totalItems: number;
  perPage: number;
  currentPage: number;
  lastPage: number;
  items?: [OrderDB];
};

//Can only be of the defined types
export type OrderStatus = "RECEIVED" | "PROCESSING" | "SHIPPING" | "COMPLETED" | "ERROR";
