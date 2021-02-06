import { Component, Element, h, Host, State } from "@stencil/core";

/**
 *
 * Init:
 * - if no children in container element, make container contenteditable, attach mouseup event
 * - if children, loop over children making each one editable, attach mouseup event
 * - if text is selected, grab range and display popup action menu with possible actions
 *
 */

@Component({
  tag: "route-editor",
})
export class Hallo {
  @Element() el: HTMLElement;
  @State() coordinates: any = null;
  @State() node: any = null;
  @State() container: any = null;

  componentDidLoad() {
    this.setupEventListener();
  }

  setupEventListener() {
    // document.addEventListener("mouseup", (e) => this.onMouseup(e));
    document.addEventListener("selectionchange", () => {
      console.log(document.getSelection().toString());
    });
  }

  saveSelection() {
    if (window.getSelection) {
      const sel = window.getSelection();
      if (sel.getRangeAt && sel.rangeCount) {
        return sel.getRangeAt(0);
      }
    }
    return null;
  }

  restoreSelection(range: Range) {
    if (range) {
      if (window.getSelection) {
        const sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
      }
    }
  }

  onMouseup(e: any) {
    if (e.path[1].id === "menu") return;
    if (e.composedPath().includes(document.querySelector("route-editor"))) {
      this.coordinates = {
        x: e.clientX,
        y: e.clientY,
      };
      // const targetNode = e.target as HTMLElement;
      const _selection = document.getSelection();
      const _range = _selection.getRangeAt(0);
      const parentNodeFromSelecetion = _selection.focusNode.parentNode as HTMLElement;
      if (parentNodeFromSelecetion) {
        this.container = parentNodeFromSelecetion;
      }
      // target.style.outline = "1px solid red";
      if (_selection.toString().length > 0) {
        // const text = _range.extractContents();

        const node = document.createElement("corejam-type");
        node.innerHTML = _selection.toString().trim();
        _range.surroundContents(node);
        this.node = node;
      }
    } else {
      this.coordinates = null;
      this.node = null;
      this.container = null;
    }
  }

  renderMenu() {
    if (this.coordinates && this.node)
      return (
        <div
          id="menu"
          style={{
            position: "fixed",
            zIndex: "100",
            top: this.coordinates.y + 10 + "px",
            left: this.coordinates.x + "px",
            padding: "10px",
            background: "#000",
            color: "#fff",
          }}
        >
          <span onClick={() => (this.node.weight = "bold")}>Bold </span>
          <span
            style={{ userSelect: "none" }}
            onClick={(e) => {
              e.preventDefault();
              const s = this.saveSelection();
              this.node.decoration = "underline";
              this.restoreSelection(s);
            }}
          >
            Underline{" "}
          </span>
          <span onClick={() => (this.node.fontStyle = "italic")}>Italic </span>
          <span
            onClick={() => {
              const color = window.prompt("color");
              this.node.color = color;
            }}
          >
            Color
          </span>
        </div>
      );
  }

  render() {
    return (
      <Host>
        {this.renderMenu()}
        <corejam-box style={{ outline: "none" }} spellcheck={false}>
          <corejam-box p={12} contentEditable="true">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sapiente officiis officia sequi obcaecati
            voluptatibus at repellendus numquam expedita tenetur delectus ratione iure eius explicabo et magni quaerat
            nam, placeat temporibus.
          </corejam-box>
          <corejam-type contentEditable="true">lorem</corejam-type>
        </corejam-box>
      </Host>
    );
  }
}
