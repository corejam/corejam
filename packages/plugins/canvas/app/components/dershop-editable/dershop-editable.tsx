import {
  Component,
  ComponentInterface,
  Host,
  h,
  State,
  Element
} from "@stencil/core";

@Component({
  tag: "dershop-editable",
  styleUrl: "dershop-editable.css",
  shadow: false
})
export class DershopEditable implements ComponentInterface {
  @Element() el: any;
  @State() editMode: boolean = false;
  @State() value: any = 0;
  @State() node: any;
  @State() edited: any = [];
  componentWillLoad() {
    this.node = this.el.children[0].constructor.observedAttributes;
  }
  clickHost(e) {
    if (e.target.innerText !== "Save") {
      if (!this.editMode) this.el.children[0].contentEditable = true;
      this.editMode = true;
    } else {
      this.editMode = false;
      this.el.children[1].contentEditable = false;
    }
  }
  edit(key, e) {
    console.log(this.el.children);
    this.el.children[1][key] = e.target.value;
    this.edited[key] = e.target.value;
    console.log(this.edited);
  }
  getAllTagMatches(regEx) {
    return Array.prototype.slice
      .call(this.el.querySelectorAll("*"))
      .filter(function(el) {
        return el.tagName.match(regEx);
      })[0];
  }

  render() {
    return (
      <Host onClick={e => this.clickHost(e)}>
        {this.editMode && (
          <div class="fixed" contenteditable="false">
            <form>
              {this.node.map(attr => (
                <div>
                  {attr}
                  <input
                    type="text"
                    name={attr}
                    value={this.getAllTagMatches(/^dershop/i)[attr]}
                    onInput={event => this.edit(attr, event)}
                  />
                </div>
              ))}
              <button onClick={e => e.preventDefault()}>Save</button>
            </form>
          </div>
        )}
        <slot></slot>
      </Host>
    );
  }
}
