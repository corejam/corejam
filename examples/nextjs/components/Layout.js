import { CorejamUiBase } from "@corejam/core-components/react";
import { DershopHeader, DershopFooter } from "@corejam/plugin-dershop/react";

const Layout = ({ children }) => {
  return (
    <>
      <CorejamUiBase />
      <DershopHeader />
      {children}
      <DershopFooter />
    </>
  );
};

export default Layout;
