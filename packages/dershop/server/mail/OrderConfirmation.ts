import Mail from "@corejam/notify/dist/server/Mail";
import { Order } from "../Models/Order";

/**
 * Gets sent on succesfull checkout
 */
export default class OrderConfirmation extends Mail {
  private order: Order;

  constructor(order: Order) {
    super(order.user.email, "Order Confirmation");
    this.order = order;
  }

  getBody(): string {
    return `
        Order confirmation: ${this.order.id}

        ${this.order.items.map((item) => {
          return `
                ${item.product.name} - ${item.price.gross}
            `;
        })}
        `;
  }
}
