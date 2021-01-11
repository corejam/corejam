import { DBDocument, Paginated, Timestamp } from "@corejam/base/dist/typings/Utils"
import { Image } from "@corejam/base/dist/typings/Image"
import { SEO } from "@corejam/base/dist/typings/Seo"

export type BlogArticle = Timestamp & {
    title: string,
    description?: string,
    content?: string,
    seo: SEO,
    coverImage?: Image
}

export type BlogArticleDB = DBDocument & BlogArticle;

export type BlogArticleInput = {
    title: string,
    description?: string,
    content?: string
}

export type ArticleList = Paginated & {
    items?: BlogArticleDB[];
}