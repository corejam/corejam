import { Component, h } from "@stencil/core";

@Component({
    tag: "derblog-header",
})
export class DerBlogHeader {

    render() {
        return (
            <corejam-box shadow="md" mx="auto" px={2} xlPx={0}>
                <corejam-box w={12}>
                    <corejam-box max="xl" mx="auto" px={2} xlPx={0} flex items="center" py={4} justify="between">
                        <corejam-box>
                            <img src="https://corejam.de/assets/logos/logo.png" />
                        </corejam-box>
                        <corejam-box flex direction="row">
                            <corejam-box px={2}>Home</corejam-box>
                            <corejam-box px={2}>Contact</corejam-box>
                        </corejam-box>
                    </corejam-box>
                </corejam-box>
            </corejam-box>
        );
    }
}