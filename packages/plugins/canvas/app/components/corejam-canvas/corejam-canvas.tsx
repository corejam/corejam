
import { Component, Host, h, State, Prop, Element } from "@stencil/core";
/*import { sendEventToMachine } from "app/components/corejam-canvas/canvas.machine";
import { coreState } from "@corejam/core-components";
import gql from "graphql-tag";
import { PostCanvasGQL } from "../../../shared/graphql/Mutations";
import { state as routerState } from "@corejam/router"
import { runState } from "@corejam/run"
import templateFnc from "./template"*/


@Component({
  tag: "corejam-canvas",
})
export class CorejamCanvas {
  @Element() el: HTMLElement;
  @Prop() canvas: any;
  @State() _canvas: any;


  /*
async deploy(e: PointerEvent) {
e.preventDefault();


const styleTags = document.querySelectorAll("style");
const stringifiedHtml = document.getElementsByTagName("corejam-canvas")[0].outerHTML;
const name = window.prompt("name");

if (name) {
const request = await coreState.client.mutate({
  mutation: gql(PostCanvasGQL),
  variables: {
    canvasPageInput: {
      canvas: JSON.stringify(templateFnc(stringifiedHtml, styleTags, name)),
      seo: {
        url: name
      }
    }
  },
});

if (request.data.canvasPageCreate.id) {
  runState.routes = [{
    url: `/${name}`,
    canvasPage: true,
    component: JSON.stringify(stringifiedHtml),
    exact: true
  }]

  routerState.router.push(`/${name}`)
}
}
}
  */
  render() {
    return (
      <Host>
        <corejam-box w={12} h="100vh" class="drop" style={{ touchAction: "none", userSelect: "none" }}>
          <slot></slot>
        </corejam-box>
        <corejam-canvas-editor></corejam-canvas-editor>
      </Host>
    );
  }
}
