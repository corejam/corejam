import { Component, h, Host, Prop } from "@stencil/core";

@Component({
  tag: "corejam-edit",
})
export class CorejamEditable {
  @Prop({ mutable: true }) node: any;
  componentWillLoad() {
    //@ts-ignore
    this.attributes = this.node.constructor.observedAttributes;
  }

  camelCase(input: string) {
    return input.toLowerCase().replace(/-(.)/g, function (_match, group1) {
      return group1.toUpperCase();
    });
  }
  edit(e: any) {
    this.node[this.camelCase(e.target.name)] = e.target.value;
  }

  render() {
    return (
      <Host>
        <corejam-box position="fixed" bottom={0} z={100} shadow="2xl" h="300px" p={4} flex w="12" direction="col">
          {this.node.localName.includes("box") && (
            <corejam-box>
              <corejam-box>
                <corejam-type>Padding</corejam-type>
              </corejam-box>
              <corejam-box flex mt={4}>
                <corejam-box>
                  All:
                  <select name="p" size={1} onChange={(e) => this.edit(e)}>
                    {[0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 32, 63].map((i) => (
                      <option value={i} selected={this.node.p === i}>
                        {i}
                      </option>
                    ))}
                  </select>
                </corejam-box>
                <corejam-box>
                  Top:
                  <select name="pt" size={1} onChange={(e) => this.edit(e)}>
                    {[0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 32, 63].map((i) => (
                      <option value={i} selected={this.node.pt === i}>
                        {i}
                      </option>
                    ))}
                  </select>
                </corejam-box>
                <corejam-box>
                  Right:
                  <select name="pr" size={1} onChange={(e) => this.edit(e)}>
                    {[0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 32, 63].map((i) => (
                      <option value={i} selected={this.node.pr === i}>
                        {i}
                      </option>
                    ))}
                  </select>
                </corejam-box>
                <corejam-box>
                  Bottom:
                  <select name="pb" size={1} onChange={(e) => this.edit(e)}>
                    {[0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 32, 63].map((i) => (
                      <option value={i} selected={this.node.pb === i}>
                        {i}
                      </option>
                    ))}
                  </select>
                </corejam-box>
                <corejam-box>
                  Left:
                  <select name="pl" size={1} onChange={(e) => this.edit(e)}>
                    {[0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 32, 63].map((i) => (
                      <option value={i} selected={this.node.pl === i}>
                        {i}
                      </option>
                    ))}
                  </select>
                </corejam-box>
              </corejam-box>
              <corejam-box>
                <corejam-type>Margin</corejam-type>
              </corejam-box>
              <corejam-box flex mt={4}>
                <corejam-box>
                  Top:
                  <select name="mt" size={1} onChange={(e) => this.edit(e)}>
                    {[0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 32, 63].map((i) => (
                      <option value={i} selected={this.node.mt === i}>
                        {i}
                      </option>
                    ))}
                  </select>
                </corejam-box>
                <corejam-box>
                  Right:
                  <select name="mr" size={1} onChange={(e) => this.edit(e)}>
                    {[0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 32, 63].map((i) => (
                      <option value={i} selected={this.node.mr === i}>
                        {i}
                      </option>
                    ))}
                  </select>
                </corejam-box>
                <corejam-box>
                  Bottom:
                  <select name="mb" size={1} onChange={(e) => this.edit(e)}>
                    {[0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 32, 63].map((i) => (
                      <option value={i} selected={this.node.mb === i}>
                        {i}
                      </option>
                    ))}
                  </select>
                </corejam-box>
                <corejam-box>
                  Left:
                  <select name="ml" size={1} onChange={(e) => this.edit(e)}>
                    {[0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 32, 63].map((i) => (
                      <option value={i} selected={this.node.ml === i}>
                        {i}
                      </option>
                    ))}
                  </select>
                </corejam-box>
              </corejam-box>
            </corejam-box>
          )}
          {this.node.localName.includes("type") && (
            <corejam-box>
              <corejam-box>
                <corejam-type>Size</corejam-type>
              </corejam-box>
              <select name="size" size={1} onChange={(e) => this.edit(e)}>
                {["xs", "sm", "base", "lg", "xl", "2xl", "3xl", "4xl", "5xl", "6xl"].map((i) => (
                  <option value={i} selected={this.node.size === i}>
                    {i}
                  </option>
                ))}
              </select>
            </corejam-box>
          )}
        </corejam-box>
      </Host>
    );
  }
}
