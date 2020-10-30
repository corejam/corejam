import { Component, Element, Event, EventEmitter, h, Host, Prop, State } from "@stencil/core";
import { computeStyle } from "../../utils/computeStyle";
import { addStyleTagToHead } from "../../helpers/Style";

@Component({
  tag: "corejam-form-input",
})
export class CorejamFormInput {
  @Element() el: HTMLElement;
  @State() inputValue: any;
  @State() hash: string;

  /**
   * Form specific props
   */

  @Prop() id?: string;
  @Prop() name: string;
  @Prop() type = "text";
  @Prop() placeholder?: string;
  @Prop() label?: string;
  @Prop() formId: string;
  @Prop() autocomplete = "off";
  @Prop() required = false;
  @Prop() value: string | number;
  @Prop() checked? = false;
  @Prop() autofocus = false;

  /**
   * Style specific prop
   */

  @Prop() w = 12;
  @Prop() bg = "gray-100";
  @Prop() hoverBg = "gray-300";
  @Prop() focusBg = "gray-300";
  @Prop() bWidth = 0;
  @Prop() p = 4;
  @Prop() focusOutline = "none";
  _relevantProps = ["w", "bg", "hoverBg", "focusBg", "bWidth", "p", "focusOutline"];

  @Event() formEvent: EventEmitter;

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

  onChange(event: InputEvent) {
    const input = event.currentTarget as HTMLInputElement;
    this.inputValue = input.value;

    if (this.type == "checkbox") {
      this.inputValue = input.checked ? true : false;
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
    const props = {
      id: this.id,
      name: this.name,
      type: this.type,
      formId: this.formId,
      autocomplete: this.autocomplete,
      required: this.required,
      placeholder: this.placeholder,
      autofocus: this.autofocus,
    };
    const cleanedProps = Object.keys(props)
      .filter((e) => props[e] !== null)
      .reduce((o, e) => {
        o[e] = props[e];
        return o;
      }, {});
    return (
      <Host style={{ display: "block", width: "100%" }}>
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
            {...cleanedProps}
            {...this.extraProps}
            class={this.hash}
            data-cy={this.formId + "-" + this.name}
            value={this.value}
            onInput={(e) => this.onChange(e as InputEvent)}
          />
        </corejam-box>
      </Host>
    );
  }
}
