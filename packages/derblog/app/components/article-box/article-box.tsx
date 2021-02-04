import { BlogArticleDB } from "@shared/types/Blog";
import { Component, h, Prop } from "@stencil/core";

@Component({
    tag: "derblog-article-box",
})
export class ArticleBox {

    @Prop() article: BlogArticleDB;

    render() {
        return (
            <corejam-box w={12} bColor="gray-200" bWidth={1}>
                <corejam-box>
                    <corejam-image src={this.article.coverImage?.src}></corejam-image>
                </corejam-box>
                <corejam-box px={5} flex direction="col">
                    <corejam-box>
                        <corejam-box>
                            <corejam-base-link href={this.article.seo.url}>
                                <corejam-type as="h3" weight="bold">
                                    {this.article.title}
                                </corejam-type>
                            </corejam-base-link>
                        </corejam-box>
                    </corejam-box>
                    <corejam-box py={5} bWidthBottom={1} bColor="gray-200">
                        {this.article.description}
                    </corejam-box>
                    <corejam-box py={2}>
                        <corejam-type fontStyle="italic">
                            {this.article.dateCreated}
                        </corejam-type>
                    </corejam-box>
                </corejam-box>
            </corejam-box>
        )
    }
}