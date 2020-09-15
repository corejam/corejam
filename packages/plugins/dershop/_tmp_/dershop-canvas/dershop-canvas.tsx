import {
  Component,
  ComponentInterface,
  Host,
  h,
  State,
  Prop,
  Method,
  Watch,
  Listen,
  Element,
  Event,
  EventEmitter,
} from "@stencil/core";
import { deepParseJson } from "deep-parse-json";

@Component({
  tag: "dershop-canvas",
  styleUrl: "dershop-canvas.css",
  shadow: true,
})
export class DershopCanvas implements ComponentInterface {
  private _draggers: string[];

  @Element() el: HTMLElement;
  @Prop() canvasId: string;
  @Prop() draggers: string | string[] = ["dershop-ui-box", "dershop-ui-type"];
  @Prop() canvas: any;
  @Prop() editMode: boolean = false;
  @State() subMenu: boolean;
  @State() _canvas: any;
  @Event() p2pSendData: EventEmitter;

  componentWillLoad() {
    this.watchDraggers(this.draggers);
    this.watchCanvas(this.canvas);
  }

  @Watch("canvas")
  watchCanvas(newValue) {
    const parsedCanvas = typeof newValue === "string" ? deepParseJson(newValue) : {};
    this._canvas = parsedCanvas;
  }

  @Watch("draggers")
  watchDraggers(newValue) {
    this._draggers = newValue ? (typeof newValue === "string" ? deepParseJson(newValue) : newValue) : {};
  }

  @Method()
  async addDragger(newDragger: string) {
    this._draggers = [...this._draggers, newDragger];
  }

  renderCanvas() {
    const render = (node) => {
      const props = {};
      node.properties?.forEach((prop) => {
        props[
          prop.name.replace(/-([a-z])/g, function (g) {
            return g[1].toUpperCase();
          })
        ] = prop.value;
      });
      let Node = node.tag;
      return <Node {...props}>{node.items ? node.items.map(render) : ""}</Node>;
    };
    return this._canvas.hasOwnProperty("items") && this._canvas.items.length > 0
      ? this._canvas.items.map(render)
      : "No content";
  }
  onMouseOver() {
    if (!this.subMenu && !this.editMode && !document.body.classList.contains("editMode")) {
      this.subMenu = true;
    }
  }

  subMenuOut() {
    this.subMenu = false;
  }

  clickEdit() {
    this.subMenu = false;
    document.body.classList.add("editMode");
    this.editMode = true;
  }

  @Listen("serializedCanvas", { target: "document" })
  receivedSerializedCanvas(e: CustomEvent) {
    const evt = {
      receiver: "Canvas",
      canvas: e.detail,
    };
    this.p2pSendData.emit(evt);
  }

  @Listen("p2pReceivedData", { target: "document" })
  receivedP2PCanvas(e: CustomEvent) {
    if (e.detail.receiver === "Canvas") {
      const canvas = deepParseJson(e.detail);
      this._canvas = canvas.canvas;
    }
  }

  render() {
    return (
      <Host
        onMouseOver={() => this.onMouseOver()}
        onMouseLeave={() => this.subMenuOut()}
        class={this.editMode ? "editMode" : ""}
      >
        {this.editMode && [
          <div id={this.canvasId} class="drop" key={this._canvas.date}>
            {this.renderCanvas()}
          </div>,
          <div class="draggers">
            {this._draggers.map((dragItem) => (
              <dershop-canvas-dragger canvas={this.canvasId} tag={dragItem}></dershop-canvas-dragger>
            ))}
          </div>,
        ]}
        {!this.editMode && this.renderCanvas()}
        {this.subMenu && (
          <div class="submenu" onClick={() => this.clickEdit()}>
            Edit
          </div>
        )}
      </Host>
    );
  }
}
