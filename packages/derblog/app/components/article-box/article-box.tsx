import { BlogArticleDB } from "@shared/types/Blog";
import { Component, h, Prop } from "@stencil/core";

@Component({
    tag: "derblog-article-box",
})
export class ArticleBox {

    @Prop() article: BlogArticleDB;

    render() {
        return (
            <corejam-box bColor="gray-200" bWidth={1}>
                <corejam-box>
                    <corejam-image src={this.article.coverImage?.src}></corejam-image>
                </corejam-box>
                <corejam-box mb={5} flex direction="col">
                    <corejam-box p={3} flex mt={5} direction="col">
                        <corejam-box>
                            <corejam-base-link href={this.article.seo.url}>
                                <corejam-type as="h3" weight="bold">
                                    {this.article.title}
                                </corejam-type>
                            </corejam-base-link>
                        </corejam-box>
                    </corejam-box>
                    <corejam-box>
                        {this.article.description}
                    </corejam-box>
                </corejam-box>
            </corejam-box>
        )
    }
}