import { CorejamUiBase } from "@corejam/core-components/react";
import { DershopHeader } from "@corejam/plugin-dershop/react";

const Layout = ({ children }) => {
  return (
    <>
      <CorejamUiBase />
      <DershopHeader />
      {children}
    </>
  );
};

export default Layout;
