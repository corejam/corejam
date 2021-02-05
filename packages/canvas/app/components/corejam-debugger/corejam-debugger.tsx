import { Component, h, Host, Prop, State } from "@stencil/core";

@Component({
  tag: "corejam-debugger",
})
export class CjDebugger {
  @State() max = false;
  @State() machineId: string;
  @Prop() machine: any = null;

  componentWillLoad() {
    this.machineId = this.machine.configuration[0].id;
  }

  render() {
    return (
      <Host onClick={() => (this.max = !this.max)}>
        {this.max && (
          <corejam-box
            position="fixed"
            z={200}
            bottom={20}
            right={20}
            flex
            w={4}
            bg="orange-200"
            rounded="sm"
            p={3}
            direction="col"
          >
            <corejam-type size="sm" color="gray-500">
              Machine debugger
            </corejam-type>
            <corejam-type size="xs">id: {this.machineId}</corejam-type>
            <corejam-type size="xs" weight="bold">
              state: {this.machine.toStrings().join("-")}
            </corejam-type>
          </corejam-box>
        )}
        {!this.max && (
          <corejam-box
            position="fixed"
            z={200}
            bottom={20}
            right={20}
            w={2}
            h="20px"
            bg="orange-200"
            rounded="full"
          ></corejam-box>
        )}
      </Host>
    );
  }
}
