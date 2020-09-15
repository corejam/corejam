import { DershopOrderView } from "@corejam/plugin-dershop/react";
import { useRouter } from "next/router";

export default () => {
  const router = useRouter();
  return <DershopOrderView orderId={router.query.id} />;
};
