import { BlogArticleDB } from "@shared/types/Blog";
import { Component, h, Prop } from "@stencil/core";

@Component({
    tag: "derblog-article",
})
export class Article {

    @Prop() article: BlogArticleDB;

    render() {
        return (
            <corejam-box bColor="gray-200" bWidth={1}>
                <corejam-type as="h1">
                    {this.article.title}
                </corejam-type>
            </corejam-box>
        )
    }
}