import Document from "next/document";
import { renderToString } from "@corejam/plugin-dershop/web-components/hydrate";
import cheerio from "cheerio";

const Style = ({ style }) =>
  style.map((inline, index) => {
    if (inline.class)
      return (
        <style
          key={index}
          dangerouslySetInnerHTML={{
            __html: `
          ${inline.inner
                .split(" ")
                .map((sub) => "." + inline.class + " " + sub)
                .join(" ")} 
          
        `,
          }}
        />
      );
    const regex = new RegExp(".hash", "g");
    return (
      <style key={index} sty-id={inline.id}>
        {inline.inner.replace(regex, "")}
      </style>
    );
  });
export default class ShopDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await super.getInitialProps(ctx);
    let res = await renderToString(initialProps.html, {
      runtimeLogging: true,
    });

    if(res.diagnostics.length) {
      res.diagnostics.map(e => {
        if(e.level = "error") {
          console.log(new Error(e.messageText))
        }
      })
    }

    let finalMarkup = initialProps.html;
    let styles = [];
    if (res.html) {
      let s = null;
      s = cheerio.load(res.html);
      s("style").each((i, el) => {
        if (s(el).attr("data-hash")) {
          styles.push({ inner: s(el).html(), class: s(el).attr("data-hash") });
        } else {
          styles.push({ inner: s(el).html(), id: s(el).attr("sty-id") });
        }
      });
      const regex = new RegExp('class="hydrated"', "g");
      finalMarkup = s("body").html().replace(regex, "");
    }
    return {
      styles: (
        <>
          {initialProps.styles}
          <Style style={styles} />
        </>
      ),
      html: finalMarkup,
      head: initialProps.head,
    };
  }
}
