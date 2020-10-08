import { Component, ComponentInterface, Host, h, Prop, Event, EventEmitter } from "@stencil/core";

@Component({
  tag: "corejam-form-submit",
  // styleUrl: "form-submit.css",
  shadow: true,
})
export class CorejamFormSubmit implements ComponentInterface {
  @Prop() formId: string;
  @Event() formSubmit: EventEmitter;

  onClick(e) {
    e.preventDefault(),
      this.formSubmit.emit({
        name: this.formId,
        type: "submit",
      });
  }
  render() {
    return (
      <Host onClick={(e) => this.onClick(e)} data-cy={`submit-${this.formId}`}>
        <slot></slot>
      </Host>
    );
  }
}
