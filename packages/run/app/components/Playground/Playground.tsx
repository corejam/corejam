import { Component, Host, h, Prop, Element, State } from "@stencil/core";

@Component({
  tag: "corejam-dev-playground",
  styles: `
  .editor {
    width: 100%;
    height: 30px;
    overflow-y: auto;
    position: fixed;
    bottom: 0;
    left: 0;
    border-top: 1px solid rgba(0,0,0,.1);
    -webkit-box-shadow: -10px -8px 50px -15px rgba(128,128,128,.5);
    -moz-box-shadow: -10px -8px 50px -15px rgba(128,128,128,.5);
    box-shadow: -10px -8px 50px -15px rgba(128,128,128,.5);
    font-size: 16px;
  }
  .editor.focus {
    height: 300px;
  }
  .editor.focus:focus {
    outline: none;
  }
  .input textarea {
    width: calc(100% - 200px);
    border: none;
    outline: none;
    padding: 4px;
    outline: none;
    font-size: 16px;
  }

  .editor.focus .input textarea {
    height: 300px;
  }
  .panel {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    background: lightgray;
    z-index: 10;
    width: 200px;
  }
  .view {
    width: 1024px;
    height: 768px;
    border: 1px solid darkgray;
    overflow-y: scroll;
  }
  app-playground {
    display: flex;
    flex-direction: column;
    background: #fefefe
  }
  .size {
    font-size: 10px;
  }
  .close {
    width: 30px;
    height: 30px;
    position: fixed;
    bottom: 320px;
    right: 20px;
    cursor: pointer;
  }
  .devices {
    display: flex;
    padding: 4px;
    justify-content: space-around;
  }
  .devices svg {
    width: 20px;
    height: 20px;
    cursor: pointer;
  }

  .devices svg:hover, .devices svg.active {
    color: #fff;
  }
  app-playground iframe {
    margin: auto;
  }
  `,
})
export class CorejamDevPlayground {
  private devices = [
    {
      name: "iPhone 6/7/8",
      type: "mobile",
      dimensions: {
        width: "375px",
        height: "667px",
      },
    },
    {
      name: "iPad",
      type: "tablett",
      dimensions: {
        width: "768px",
        height: "1024px",
      },
    },
    {
      name: "Laptop",
      type: "desktop",
      dimensions: {
        width: "1024px",
        height: "1000px",
      },
    },
    {
      name: "Laptop L",
      type: "desktop",
      dimensions: {
        width: "1440px",
        height: "1000px",
      },
    },
  ];
  @State() max = false;
  @State() markup: string;
  @State() device: any = this.devices.filter((d) => d.name === "Laptop")[0];
  @Prop() cmp: string;
  @Prop() data: any;
  @Element() component: HTMLElement;
  componentWillLoad() {
    this.markup = `<${this.cmp}></${this.cmp}>`;
  }

  handleClick(e) {
    console.log(e);
  }

  maxy() {
    if (!this.max) {
      this.max = true;
      const area = this.component.querySelector("textarea");
      area.focus();
    }
  }

  render() {
    const playground = document.location.search.includes("live");
    const Component = this.cmp;
    if (playground)
      return (
        <Host>
          <iframe
            style={this.device.dimensions}
            src={`http://localhost:3001/liveview?data=${JSON.stringify({ content: this.markup })}`}
            frameborder="0"
          ></iframe>
          {this.max && (
            <div class="close" onClick={() => (this.max = false)}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  //@ts-ignore
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          )}
          <div class={`editor ${this.max ? "focus" : ""}`}>
            <div class="panel">
              <div class="devices">
                {this.devices.map((d) => {
                  if (d.type === "mobile")
                    return (
                      <svg
                        class={d === this.device ? "active" : ""}
                        onClick={() => (this.device = d)}
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          //@ts-ignore
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                        />
                      </svg>
                    );
                  if (d.type === "tablett")
                    return (
                      <svg
                        class={d === this.device ? "active" : ""}
                        onClick={() => (this.device = d)}
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M12 18h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                        />
                      </svg>
                    );
                  if (d.type === "desktop")
                    return (
                      <svg
                        class={d === this.device ? "active" : ""}
                        onClick={() => (this.device = d)}
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          //@ts-ignore
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                    );
                })}
              </div>
            </div>
            <div class="input" onClick={() => this.maxy()}>
              <textarea
                autocorrect="off"
                autocapitalize="off"
                spellcheck="false"
                name="editor"
                onInput={(event) => (this.markup = (event.target as HTMLInputElement).value)}
              >
                {this.markup}
              </textarea>
            </div>
          </div>
        </Host>
      );
    return (
      <Host>
        <Component></Component>
      </Host>
    );
  }
}
