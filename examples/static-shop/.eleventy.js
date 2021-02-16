require("dotenv").config();

module.exports = function (config) {
  config.addPassthroughCopy("static");
  config.addPassthroughCopy({
    "../../node_modules/@corejam/web-components-dev/dist/dershop": "static/@corejam",
  });

  config.addCollection("testy", () => [12, 14, 12]);
  config.addFilter("dump", (obj) => {
    const getCircularReplacer = () => {
      const seen = new WeakSet();
      return (key, value) => {
        if (typeof value === "object" && value !== null) {
          if (seen.has(value)) {
            return;
          }
          seen.add(value);
        }
        return value;
      };
    };

    return JSON.stringify(obj, getCircularReplacer(), 4);
  });

  //@TODO delete unused css, inline preload used bundles on page
  config.addTransform("ssr", async (content, outputPath) => {
    // if (process.env.NODE_ENV === "production") {
    const { renderToString } = require("@corejam/web-components-dev/hydrate");
    if (outputPath.endsWith(".html")) {
      try {
        const result = await renderToString(content, {
          prettyHtml: true,
          clientHydrateAnnotations: true,
        });
        return result.html;
      } catch (error) {
        return error;
      }
    }
    // }
    return content;
  });

  return {
    templateFormats: ["md", "njk", "html", "liquid"],
    markdownTemplateEngine: "liquid",
    htmlTemplateEngine: "njk",
    dataTemplateEngine: "njk",
    dir: {
      input: "./src",
      includes: "_includes",
      data: "_data",
      output: "public",
    },
  };
};
