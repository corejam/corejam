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

    if (res.diagnostics.length) {
      res.diagnostics.map((e) => {
        if ((e.level = "error")) {
          console.log(new Error(e.messageText));
        }
      });
    }

    let finalMarkup = initialProps.html;

    return {
      styles: <>{initialProps.styles}</>,
      html: finalMarkup,
      head: initialProps.head,
    };
  }
}
