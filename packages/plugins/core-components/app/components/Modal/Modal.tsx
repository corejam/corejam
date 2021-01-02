import { Component, Host, h, Prop, Event, EventEmitter, Element } from "@stencil/core";

@Component({
    tag: "corejam-modal",
})
export class CorejamModal {

    @Prop() message: string;
    @Prop() type: "error" | "warning" | "success" = "success"
    @Event({ eventName: "corejam:modal:close" }) corejamModalClose: EventEmitter;
    @Element() modalInstance: HTMLElement;

    closeModal() {
        this.modalInstance.remove()
        this.corejamModalClose.emit();
    }

    private colorMap = {
        error: "red-600",
        warning: "orange-500",
        success: "green-600"
    }

    render() {
        return (
            <Host>
                <corejam-box position="fixed" z={1000} top={0} right={0} bottom={0} left={0} style={{ background: "rgba(255,255,255, 0.6", backdropFilter: "blur(2px)" }}>
                    <corejam-grid h="100%" style={{ placeItems: "center" }}>
                        <corejam-box bWidth={1} bColor="gray-400" rounded="md" shadow="lg" flex items="center" position="relative" justify="center" direction="col" p={4} h="200px" w="3" bg="white">
                            <corejam-box onClick={() => this.closeModal()} top={10} position="absolute" right={10}>X</corejam-box>
                            <corejam-type weight="bold" as="h3" color={this.colorMap[this.type]}>{this.type.toUpperCase()}</corejam-type>
                            <corejam-type>{this.message}</corejam-type>
                        </corejam-box>
                    </corejam-grid>
                </corejam-box>
            </Host>
        );
    }
}
