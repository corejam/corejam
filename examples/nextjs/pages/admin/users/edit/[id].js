import { AuthAdminUserForm } from "@corejam/plugin-auth/react";
import { useRouter } from "next/router";

export default () => {
  const router = useRouter();
  return <AuthAdminUserForm formId={router.query.id} />;
};
