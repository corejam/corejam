import { Component, h } from "@stencil/core";

@Component({
    tag: "derblog-footer",
})
export class DerBlogFooter {

    render() {
        return (
            <corejam-box p={20} mt={20} flex bg="gray-100" justify="center" w={12} h="250px">
                <corejam-box w={12}>
                    Footer
                </corejam-box>
            </corejam-box>
        );
    }
}