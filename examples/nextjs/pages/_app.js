import { CorejamInit } from "@corejam/plugin-dershop/react";
import Layout from "../components/Layout";
import { useRouter } from "next/router";

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <CorejamInit router={useRouter()}>
        <Component {...pageProps} />
      </CorejamInit>
    </Layout>
  );
}

export default MyApp;
