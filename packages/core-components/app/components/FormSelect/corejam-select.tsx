import { Component, State, ComponentInterface, Element, Event, EventEmitter, h, Host, Prop } from "@stencil/core";

export declare type options = {
  key: string;
  value: string | number;
  selected?: boolean;
};

@Component({
  tag: "corejam-form-select",
})
export class CorejamFormSelect implements ComponentInterface {
  @Element() el: HTMLElement;
  @Prop({ reflect: true }) name: string;
  @Prop({ reflect: true }) label: string;
  @Prop({ reflect: true }) formId: string;
  @Prop({ reflect: true }) options: Array<options>;
  @Prop({ reflect: true }) selected: any;
  @Event() formEvent: EventEmitter;
  @State() inputValue: any;
  @Prop({ reflect: true }) multiple = false;

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
