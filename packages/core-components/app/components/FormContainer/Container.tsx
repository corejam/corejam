import { Component, h, Host, Listen, State, Event, EventEmitter, Prop } from "@stencil/core";

@Component({
  tag: "corejam-form-container",
})
export class CorejamFormContainer {
  @Prop({ reflect: true }) name: string;
  @State() formData: any = {};
  @Event() formEvent: EventEmitter;
  @Event() formSubmit: EventEmitter;
  @Event() sendForm: EventEmitter;
  @Prop({ reflect: true }) submitHandler: Function;

  @Listen("formSubmit")
  handleSubmit(e) {
    if (e.detail.name == this.name) {
      console.info("form submit");
      const data = {
        ...this.formData,
      };
      if (this.submitHandler) this.submitHandler(data);

      this.sendForm.emit(data);
    }
  }

  @Listen("formEvent")
  receivedFormEvent(event) {
    if (event.detail.name == this.name) {
      const formData = {
        ...this.formData,
        formId: this.name,
      };
      console.log(formData);
      formData[event.detail.key] = event.detail;
      this.formData = formData;
    }
  }

  render() {
    return (
      <Host as="form">
        <form name={this.name}>
          <slot></slot>
        </form>
      </Host>
    );
  }
}
