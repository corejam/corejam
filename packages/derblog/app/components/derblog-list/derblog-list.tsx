import { Component, h, Prop } from "@stencil/core";

@Component({
    tag: "derblog-list",
})
export class DerBlogList {

    @Prop() page = 1;

    render() {
        return (
            <corejam-grid>
                <corejam-grid smTemplateColumns={2} mdTemplateColumns={2} lgTemplateColumns={2} gapCol={6} gapRow={6}>
                    <derblog-article-box></derblog-article-box>
                    <derblog-article-box></derblog-article-box>
                    <derblog-article-box></derblog-article-box>
                    <derblog-article-box></derblog-article-box>
                    <derblog-article-box></derblog-article-box>
                    <derblog-article-box></derblog-article-box>
                    <derblog-article-box></derblog-article-box>
                </corejam-grid>
            </corejam-grid>
        )
    }
}