import { Component, h } from "@stencil/core";

@Component({
    tag: "derblog-author-box",
})
export class DerBlogAuthorBox {

    render() {
        return (
            <corejam-box flex direction="row" p={10} m={2} mx={2} bg="green-50" px={2} xlPx={0}>
                <corejam-box w={2} bWidth={1} bColor="grey-200">
                    <corejam-image src=""></corejam-image>
                </corejam-box>
                <corejam-box w={10} flex direction="col">
                    <corejam-box>
                        Author name
                    </corejam-box>
                    <corejam-box>
                        Author description
                </corejam-box>
                </corejam-box>
            </corejam-box>
        );
    }
}