import { random } from "faker";
import type { Category, CategoryDB, CategoryEditInput } from "../../../../shared/types/Category";
import { generateCategory } from "./Generator";

export let categories = [] as CategoryDB[];

try {
  const staticFile = require(process.cwd() + "/.corejam/faker.json");
  categories.push(...staticFile.categories);
  console.log("Load from static data");
} catch (e) {
  //Nothing for now
}

if (categories.length === 0) {
  for (let index = 0; index < 10; index++) {
    const generated = generateCategory();

    categories.push({
      id: random.uuid(),
      ...generated,
    } as CategoryDB);
  }
}

export function allCategories(): Promise<CategoryDB[]> {
  return new Promise((res) => res(categories));
}

export function categoryById(id: string): Promise<CategoryDB | null> {
  return new Promise((res) => res(categories.filter((category: CategoryDB) => category.id === id)[0]));
}

export function categoryCreate(categoryInput: Category): Promise<CategoryDB> {
  const model = {
    id: random.uuid(),
    ...categoryInput,
  };
  categories.push(model);

  return new Promise((res) => res(model));
}

export function categoryEdit(id: string, categoryInput: CategoryEditInput): Promise<CategoryDB> {
  let category = categories.filter((category: CategoryDB) => {
    return category.id === id;
  })[0];

  category = { ...category, ...categoryInput };

  categories = categories.map((categoryMap: CategoryDB) => {
    if (categoryMap.id === id) {
      categoryMap = { ...category };
    }
    return categoryMap;
  });

  return new Promise((res) => res(category));
}

export function categoryByUrl(slug: string): Promise<CategoryDB | null> {
  const category = categories.filter((category) => {
    if (category.seo?.url == slug) {
      return category;
    }
    return;
  })[0];

  return new Promise((res) => res(category));
}
