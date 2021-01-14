import { exists, list, read } from "fs-jetpack";

const regexTag = /tag: \"(.*)\"/;

export function extractLayouts(root: string): any[] {
  const layouts = [];
  if (exists(root + "/app/layout")) {
    const componentLevel = list(root + "/app/layout") || [];
    for (const file of componentLevel) {
      if (file.includes("tsx")) {
        const f = read(root + "/app/layout/" + file);
        const tagMatch = f.match(regexTag);
        if (tagMatch)
          layouts.push({
            type: "layout",
            component: tagMatch[1],
          });
      }
    }
    return layouts;
  }
  return layouts;
}
