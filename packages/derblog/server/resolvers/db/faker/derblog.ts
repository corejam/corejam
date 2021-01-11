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
    seo: {
      url: "static-test"
    },
    ...derblogCreateInput,
    ...updateDates()
  }

  blogArticles.push(article);

  return new Promise((res) => res(article));
}

export function blogArticleByUrl(slug: string): Promise<BlogArticleDB | null> {
  const article = blogArticles.filter((article) => {
    if (article.seo?.url == slug) {
      return article;
    }
    return;
  });

  return new Promise((res) => res(article[0]));
}
