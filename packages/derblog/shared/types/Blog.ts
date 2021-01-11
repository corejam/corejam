import { DBDocument, Paginated, Timestamp } from "@corejam/base/dist/typings/Utils"

export type BlogArticle = Timestamp & {
    title: string,
    description?: string,
    content?: string,
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