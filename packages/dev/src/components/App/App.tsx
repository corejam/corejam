import { Component, Host, h, State, Prop } from "@stencil/core";

@Component({
  tag: "app-root",
})
export class AppRoot {
  private routes: any;
  private wrapper: any;
  private recos: any;
  private layout: any;
  @Prop() static = false;
  @State() docs: any = [];
  @State() hash: any;
  @State() mode: string;
  async componentWillLoad() {
    return new Promise(async (res) => {
      try {
        const config = await fetch("/build/config.json");
        if (config) {
          const configJson = await config.json();
          this.routes = { components: configJson.components, routes: configJson.routes };
          this.wrapper = configJson?.wrapper || [];
          this.recos = configJson?.recommendations || [];
          this.mode = configJson.mode;
          this.layout = configJson.layout;
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

  renderLayout(children) {
    if (this.layout) {
      const Layout = this.layout.component;
      return <Layout>{children}</Layout>
    }
    return children;
  }

  render() {
    const Wrapper = this.wrapper ? this.wrapper[0] : "div";
    return (
      <Host>
        <Wrapper>
          {this.renderRecos()}
          {this.renderLayout(<app-router routes={this.routes} mode={this.mode} />)}
        </Wrapper>
      </Host>
    );
  }
}
