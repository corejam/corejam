import { DershopOrderView } from "@corejam/plugin-dershop/react";
import { useRouter } from "next/router";

const Order = () => {
  const router = useRouter();
  return <DershopOrderView orderId={router.query.id} />;
};

export default Order;
