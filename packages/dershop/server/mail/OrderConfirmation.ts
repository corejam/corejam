import Mail from "@corejam/notify/dist/server/Mail";
import { OrderDB } from "../../shared/types/Order";

/**
 * Gets sent on succesfull checkout
 */
export default class OrderConfirmation extends Mail {

    private order: OrderDB;

    constructor(order: OrderDB) {
        super(order.user.email, "Order Confirmation")
        this.order = order;
    }

    getBody(): string {
        return (`
        Order confirmation: ${this.order.id}

        ${this.order.items.map(item => {
            return (`
                ${item.product.name} - ${item.price.gross}
            `)
        })}
        `)
    }
}