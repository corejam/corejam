import { Component, ComponentInterface, Element, Event, EventEmitter, h, Host, Prop, State } from "@stencil/core";
import { computeStyle } from "../../utils/computeStyle";
import { addStyleTagToHead } from "../../helpers/Style";

@Component({
  tag: "corejam-form-input",
})
export class CorejamFormInput implements ComponentInterface {
  @Element() el: HTMLElement;
  @State() inputValue: any;
  @State() hash: string;

  @Prop() name: string;
  @Prop() type: string;
  @Prop() placeholder: string;
  @Prop() label: string;
  @Prop() formId: string;
  @Prop() autocomplete = "off";
  @Prop() required = false;
  @Prop() value: string | number;
  @Prop() checked = false;

  @Prop() w = 12;
  @Prop() bg = "gray-100";
  @Prop() hoverBg = "gray-300";
  @Prop() focusBg = "gray-300";
  @Prop() bWidth = 0;
  @Prop() p = 4;
  @Prop() focusOutline = "none";

  @Event() formEvent: EventEmitter;

  _relevantProps = ["w", "bg", "hoverBg", "focusBg", "bWidth", "p", "focusOutline"];

  private extraProps = {};

  async componentWillLoad() {
    await this.computeStyles();
  }

  async computeStyles() {
    return new Promise(async (res) => {
      const styleMap = (await import("../../utils/style")).generateStyleMap(this, "");
      const [hashCode, style] = computeStyle(styleMap);
      this.hash = hashCode;
      addStyleTagToHead(style, hashCode);

      res();
    });
  }

  onChange(e) {
    this.inputValue = e.currentTarget.value;

    if (this.type == "checkbox") {
      this.inputValue = e.currentTarget.checked ? true : false;
    }

    this.formEvent.emit({
      name: this.formId,
      key: this.name,
      type: this.type,
      value: this.inputValue,
    });
  }

  componentWillRender() {
    if (this.type == "checkbox") {
      this.extraProps["checked"] = this.checked ? true : null;
    }
  }

  render() {
    return (
      <Host>
        <corejam-box flex direction="col" w={12} mb={3}>
          {this.label && (
            <corejam-box mb={4}>
              <label htmlFor={this.name}>
                <corejam-type size="sm" color="gray-500">
                  {this.label}
                </corejam-type>
              </label>
            </corejam-box>
          )}
          <input
            class={this.hash}
            data-cy={this.formId + "-" + this.name}
            required={this.required}
            type={this.type}
            value={this.value}
            id={this.name}
            name={this.name}
            autocomplete={this.autocomplete}
            placeholder={this.placeholder}
            onInput={(e) => this.onChange(e)}
            {...this.extraProps}
          />
        </corejam-box>
      </Host>
    );
  }
}
