import { Component, Element, Event, EventEmitter, h, Host, Prop, State } from "@stencil/core";

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

  @Prop({ reflect: true }) _id?: string;
  @Prop({ reflect: true }) name: string;
  @Prop({ reflect: true }) type = "text";
  @Prop({ reflect: true }) placeholder?: string;
  @Prop({ reflect: true }) label?: string;
  @Prop({ reflect: true }) formId: string;
  @Prop({ reflect: true }) autocomplete = "off";
  @Prop({ reflect: true }) required = false;
  @Prop({ reflect: true }) value: string | number;
  @Prop({ reflect: true }) checked? = false;
  @Prop({ reflect: true }) autofocus = false;

  /**
   * Style specific prop
   */

  @Prop({ reflect: true }) w = 12;
  @Prop({ reflect: true }) bg = "gray-100";
  @Prop({ reflect: true }) hoverBg = "gray-300";
  @Prop({ reflect: true }) focusBg = "gray-300";
  @Prop({ reflect: true }) bWidth = 0;
  @Prop({ reflect: true }) p = 4;
  @Prop({ reflect: true }) focusOutline = "none";

  @Event() formEvent: EventEmitter;

  private extraProps = {};

  async componentWillLoad() {
    await this.computeStyles();
  }

  async computeStyles() {
    const hash = await (await import("../../utils/style")).calculateStyles(this);
    this.hash = hash;
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
      id: this._id,
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
        <corejam-box flex direction="col" w="12" mb={3}>
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
