import { CorejamInit } from "@corejam/plugin-dershop/react";
import Layout from "../components/Layout";
import { useRouter } from "next/router";

function MyApp({ Component, pageProps }) {
  return (
    <CorejamInit router={useRouter()}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </CorejamInit>
  );
}

export default MyApp;
