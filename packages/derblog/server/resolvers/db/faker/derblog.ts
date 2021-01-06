import { updateDates } from "@corejam/base";
import { random } from "faker";
import { BlogArticleDB, BlogArticleInput } from "../../../../shared/types/Blog";
import { generateBlogArticle } from "./Generator";

const blogArticles = [] as BlogArticleDB[];

if (blogArticles.length === 0) {
  for (let index = 0; index < 20; index++) {
    blogArticles.push({
      id: random.uuid(),
      ...generateBlogArticle(),
    });
  }
}

export async function getAllBlogPosts(): Promise<BlogArticleDB[]> {
  return new Promise((res) => res(blogArticles));
}

export function createBlogArticle(derblogCreateInput: BlogArticleInput): Promise<BlogArticleDB> {

  const article: BlogArticleDB = {
    id: random.uuid(),
    ...derblogCreateInput,
    ...updateDates()
  }

  blogArticles.push(article);

  return new Promise((res) => res(article));
}
