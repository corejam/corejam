import { Component, State, ComponentInterface, Element, Event, EventEmitter, h, Host, Prop } from "@stencil/core";

export declare type options = {
  key: string;
  value: string | number;
  selected?: boolean;
};

@Component({
  tag: "corejam-form-select",
  shadow: true,
})
export class CorejamFormSelect implements ComponentInterface {
  @Element() el: HTMLElement;
  @Prop() name: string;
  @Prop() label: string;
  @Prop() formId: string;
  @Prop() options: Array<options>;
  @Prop() selected: any;
  @Event() formEvent: EventEmitter;
  @State() inputValue: any;
  @Prop() multiple = false;

  private extraProps = {};

  onChange(e) {
    this.inputValue = e.currentTarget.value;
    this.formEvent.emit({
      name: this.formId,
      key: this.name,
      type: "select",
      value: this.inputValue,
    });
  }

  componentWillRender() {
    if (this.multiple) {
      this.extraProps["multiple"] = true;
    }
  }

  render() {
    return (
      <Host>
        <corejam-box flex direction="col" w={12} mb={3}>
          <corejam-box mb={2}>
            <label htmlFor={this.name}>
              <corejam-type size="sm" color="gray-500">
                {this.label}
              </corejam-type>
            </label>
          </corejam-box>
          <select id={this.name} name={this.name} {...this.extraProps}>
            {this.options.map((option) => {
              const selected = {};
              if (option.selected) {
                selected["selected"] = true;
              }
              return (
                <option value={option.value} {...selected}>
                  {option.key}
                </option>
              );
            })}
          </select>
        </corejam-box>
      </Host>
    );
  }
}
