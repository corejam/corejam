import {
  Component,
  ComponentInterface,
  Element,
  Event,
  EventEmitter,
  h,
  Host,
  Prop,
  State,
  Watch,
} from "@stencil/core";
import { computeStyle } from "../../shared/utils/computeStyle";
import { Style } from "../../shared/helpers/Style";

@Component({
  tag: "corejam-form-input",
  shadow: true,
})
export class CorejamFormInput implements ComponentInterface {
  @Element() el: HTMLElement;
  @State() inputValue: any;
  @State() style: any[];
  @State() hash: string;
  @State() computedStyle: string;

  @Prop() name: string;
  @Prop() type: string;
  @Prop() placeholder: string;
  @Prop() label: string;
  @Prop() formId: string;
  @Prop() autocomplete: string = "off";
  @Prop() required: boolean = false;
  @Prop() value: string | number;
  @Prop() checked = false;

  @Prop() w: number = 12;
  @Prop() bg: string = "gray-100";
  @Prop() hoverBg: string = "gray-300";
  @Prop() focusBg: string = "gray-300";
  @Prop() bWidth: number = 0;
  @Prop() p: number = 4;
  @Prop() focusOutline: string = "none";

  @Event() formEvent: EventEmitter;

  _relevantProps = ["w", "bg", "hoverBg", "focusBg", "bWidth", "p", "focusOutline"];

  private extraProps = {};

  async componentWillLoad() {
    await this.computeStyles();
  }

  async computeStyles() {
    return new Promise(async (res) => {
      this.style = (await import("../../shared/utils/style")).generateStyleMap(this, "");
      res();
    });
  }

  @Watch("style")
  generateFinalStyleTags() {
    const [hashCode, style] = computeStyle(this.style);
    if (hashCode) {
      this.hash = hashCode;
      this.computedStyle = style;
    }
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
        {this.hash && <Style styles={this.computedStyle} hash={this.hash} />}
      </Host>
    );
  }
}
