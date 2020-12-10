import { Component, Host, h, Prop, State } from "@stencil/core";
import { State as StateType } from "xstate";

@Component({
  tag: "corejam-debugger",
})
export class CjDebugger {
  @State() max = false;
  @State() machineId: string;
  @Prop() machine: StateType<any, any, any> = null;

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
            w="200px"
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
            w="20px"
            h="20px"
            bg="orange-200"
            rounded="full"
          ></corejam-box>
        )}
      </Host>
    );
  }
}
