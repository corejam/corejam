import { Component, Host, h, State } from "@stencil/core";

@Component({
  tag: "app-root",
})
export class AppRoot {
  private routes: any;
  private wrapper: any;
  private recos: any;
  @State() docs: any = [];
  @State() hash: any;

  async componentWillLoad() {
    return new Promise(async (res) => {
      const config = await import("./config.json");
      this.routes = config.default;
      this.wrapper = config?.wrapper || [];
      this.recos = config?.recommendations || [];
      if (process.env.MODE !== "static") {
        const docs = await fetch("/assets/custom-elements.json");
        if (docs) {
          const data = await docs.json();
          this.docs = data;
          res();
        }
      }
      res();
    });
  }

  renderRecos() {
    return this.recos.map((reco) => {
      const Reco = reco;
      return <Reco></Reco>;
    });
  }
  renderContent() {
    if (process.env.MODE === "static") {
      return <app-static-router routes={this.routes} docs={[]} />;
    }
    return <app-router routes={this.routes} docs={this.docs} />;
  }
  render() {
    const Wrapper = this.wrapper[0];
    return (
      <Host>
        <Wrapper>
          {this.renderRecos()}
          {this.renderContent()}
        </Wrapper>
      </Host>
    );
  }
}
