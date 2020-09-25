import { Component, Host, h, State, Prop } from "@stencil/core";

@Component({
  tag: "app-root",
})
export class AppRoot {
  private routes: any;
  private wrapper: any;
  private recos: any;
  @Prop() static: boolean = false;
  @State() docs: any = [];
  @State() hash: any;

  async componentWillLoad() {
    return new Promise(async (res) => {
      try {
        const config = await fetch("/build/config.json");
        if (config) {
          const configJson = await config.json();
          this.routes = { components: configJson.components, routes: configJson.routes };
          this.wrapper = configJson?.wrapper || [];
          this.recos = configJson?.recommendations || [];
          // if (process.env.MODE !== "static") {
          //   const docs = await fetch("/assets/custom-elements.json");
          //   if (docs) {
          //     const data = await docs.json();
          //     this.docs = data;
          //     res();
          //   }
          // }
          res();
        }
      } catch (e) {
        res();
      }
    });
  }

  renderRecos() {
    return this.recos?.map((reco) => {
      const Reco = reco;
      return <Reco></Reco>;
    });
  }
  renderContent() {
    if (this.static) {
      return <app-static-router routes={this.routes} docs={[]} />;
    }
    return <app-router routes={this.routes} />;
  }
  render() {
    const Wrapper = this.wrapper ? this.wrapper[0] : "div";
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
