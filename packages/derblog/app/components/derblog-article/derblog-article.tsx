import { BlogArticleDB } from "@shared/types/Blog";
import { Component, h, Prop } from "@stencil/core";

@Component({
    tag: "derblog-article",
})
export class Article {

    @Prop() article: BlogArticleDB;

    render() {
        return (
            <corejam-box w={12} bColor="gray-100" bWidth={1}>
                <corejam-box>
                    <img src={this.article.coverImage?.src} style={{ maxHeight: "400px", width: "100%", objectFit: "cover" }} />
                </corejam-box>
                <corejam-box p={5}>
                    <corejam-type as="h1" m={5}>
                        {this.article.title}
                    </corejam-type>
                    <corejam-type>
                        {this.article.content}
                    </corejam-type>
                </corejam-box>
            </corejam-box>
        )
    }
}