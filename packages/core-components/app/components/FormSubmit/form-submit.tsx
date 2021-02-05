import { Component, ComponentInterface, Event, EventEmitter, h, Host, Prop } from "@stencil/core";

@Component({
  tag: "corejam-form-submit",
  // styleUrl: "form-submit.css",
})
export class CorejamFormSubmit implements ComponentInterface {
  @Prop({ reflect: true }) formId: string;
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
