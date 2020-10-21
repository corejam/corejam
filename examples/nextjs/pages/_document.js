import Document from "next/document";
import { renderToString } from "@corejam/plugin-dershop/web-components/hydrate";

export default class ShopDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await super.getInitialProps(ctx);
    let res = await renderToString(initialProps.html, {
      runtimeLogging: true,
    });

    if (res.diagnostics.length) {
      res.diagnostics.map((e) => {
        if ((e.level = "error")) {
          console.log(new Error(e.messageText));
        }
      });
    }

    return {
      html: res.html,
      head: initialProps.head,
    };
  }
}
