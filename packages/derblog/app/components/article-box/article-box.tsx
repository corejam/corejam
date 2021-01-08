import { Component, h } from "@stencil/core";

@Component({
    tag: "derblog-article-box",
})
export class ArticleBox {

    render() {
        return (
            <corejam-box bColor="gray-200" bWidth={1}>
                <corejam-box>
                    <corejam-image src="/build/assets/1.png"></corejam-image>
                </corejam-box>
                <corejam-box mb={5} flex direction="col">
                    <corejam-box p={3} flex mt={5} direction="col">
                        <corejam-box>
                            <corejam-type as="h3" weight="bold">Test</corejam-type>
                        </corejam-box>
                    </corejam-box>
                    <corejam-box>
                        Text palceholder lalala
                    </corejam-box>
                </corejam-box>
            </corejam-box>
        )
    }
}