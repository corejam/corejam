import { list, read, exists } from "fs-jetpack";

const regexTag = /tag: \"(.*)\"/;

export function extractComponentsToRoutes(root: string, name = null): any[] {
  if (!exists(root + "/app")) return [];
  const routes = [];
  const components = list(root + "/app/components") || [];
  for (const component of components) {
    if (!component.includes(".ts")) {
      const componentLevel = list(root + "/app/components/" + component) || [];
      for (const file of componentLevel) {
        if (file.includes("tsx")) {
          const f = read(root + "/app/components/" + component + "/" + file);

          const tagMatch = f.match(regexTag);
          if (tagMatch) {
            routes.push({
              url: name ? `plugin/${name}/component/${tagMatch[1]}` : `/component/${tagMatch[1]}`,
              exact: true,
              component: tagMatch[1],
              dev: false,
            });
          }
        }
      }
    }
  }
  return routes;
}

export function extractRoutes(root: string, name = null): any[] {
  if (!exists(root + "/app")) return [];

  const namedRoutes = [];
  const wildcardRoutes = [];

  const traverse = (lookupPath: string) => {
    let paths = [];
    if (!lookupPath.includes(".md")) {
      paths = list(lookupPath) || [];
    }
    for (const current of paths) {
      if (current.indexOf("tsx") > -1) {
        const segments = lookupPath
          .replace(root + "/app/routes", null)
          .split("/")
          .filter((s) => s !== "null");
        const isIndex = current === "index.tsx";
        const url =
          segments.length === 0
            ? `/${isIndex ? "" : current.replace(root, "").replace(".tsx", "")}`
            : `/${segments.join("/").replace(root, "").replace("/app/routes", "")}/${
                isIndex ? "" : current.replace(".tsx", "")
              }`;
        const f = read(lookupPath + "/" + current);
        const tagMatch = f.match(regexTag);
        if (tagMatch) {
          if (url.indexOf("[") > -1) {
            const dynamicMatch = url.match(/\[.+\]/)[0];
            const paramName = dynamicMatch.replace("[", "").replace("]", "");
            const raw = name ? `plugin/${name}/${url.replace(dynamicMatch, "")}` : url.replace(dynamicMatch, "");
            const newUrl = raw + ":" + paramName;
            wildcardRoutes.push({
              url: newUrl,
              exact: false,
              component: tagMatch[1],
              dev: false,
            });
          } else {
            namedRoutes.push({
              url: name ? `plugin/${name}/${url}` : url,
              exact: true,
              component: tagMatch[1],
              dev: false,
            });
          }
        }
      } else {
        traverse(lookupPath + "/" + current);
      }
    }
  };
  traverse(root + "/app/routes");
  return [...namedRoutes, ...wildcardRoutes];
}
