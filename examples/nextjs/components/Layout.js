import { CorejamUiBase } from "@corejam/core-components/react";
import { DershopHeader, DershopFooter } from "@corejam/plugin-dershop/react";

const Layout = ({ children }) => {
  return (
    <>
      <CorejamUiBase />
      <DershopHeader />
      <div>{children}</div>
      <DershopFooter />
    </>
  );
};

export default Layout;
