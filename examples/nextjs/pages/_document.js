import Document from "next/document";
import { renderToString } from "@corejam/plugin-dershop/web-components/hydrate";
import cheerio from "cheerio";

const Style = ({ style }) =>
  style.map((inline, index) => {
    return (
      <style
        key={index}
        id={inline.id}
        corejamstyle={inline.id}
        dangerouslySetInnerHTML={{ __html: inline.inner }}
      ></style>
    );
  });

export default class ShopDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await super.getInitialProps(ctx);
    let res = await renderToString(initialProps.html, {
      runtimeLogging: false,
      clientHydrateAnnotations: false,
      removeBooleanAttributeQuotes: true,
      removeHtmlComments: true,
    });

    if (res.diagnostics.length) {
      res.diagnostics.map((e) => {
        if ((e.level = "error")) {
          console.log(new Error(e.messageText));
        }
      });
    }

    let finalMarkup = initialProps.html;
    let styles = [];
    if (res.html) {
      let s = null;
      s = cheerio.load(res.html);
      s("head style").each((i, el) => {
        styles.push({ inner: s(el).html(), id: s(el).attr("id") });
      });
      const regex = new RegExp(' class="hydrated"', "g");
      const r2 = new RegExp(/ hydrated/, "g");
      const t = s("body").html().replace(regex, "").replace(r2, "");

      finalMarkup = t;
    }

    return {
      styles: (
        <>
          {initialProps.styles}
          <Style style={styles} />
        </>
      ),
      html: finalMarkup,
    };
  }
}
