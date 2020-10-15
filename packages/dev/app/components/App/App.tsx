import { Component, Host, h, State } from "@stencil/core";

@Component({
  tag: "app-root",
})
export class AppRoot {
  private routes: any;
  private wrapper: any;
  private recos: any;
  private layout: any;

  @State() docs: any = [];
  @State() hash: any;
  @State() mode: string;

  async componentWillLoad() {
    return new Promise(async (res) => {
      try {
        const config = await fetch("/build/config.json");
        const configJson = await config.json();
        if (configJson) {
          this.routes = { components: configJson.components, routes: configJson.routes };
          this.wrapper = configJson?.wrapper || [];
          this.recos = configJson?.recommendations || [];
          this.mode = configJson.mode;
          this.layout = configJson.layout;
          res();
          // if (process.env.MODE !== "static") {
          //   const docs = await fetch("/assets/custom-elements.json");
          //   if (docs) {
          //     const data = await docs.json();
          //     this.docs = data;
          //     res();
          //   }
          // }
        }
      } catch (e) {
        console.log(e);
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
      return <Layout>{children}</Layout>;
    }
    return children;
  }

  renderWrapperComponent() {
    const Wrapper = this.wrapper.length > 0 ? this.wrapper[0] : "div";
    if (Wrapper) {
      return (
        <Wrapper>
          {this.renderRecos()}
          {this.renderLayout(<app-router routes={this.routes} mode={this.mode} />)}
        </Wrapper>
      );
    }
    return [this.renderRecos(), this.renderLayout(<app-router routes={this.routes} mode={this.mode} />)];
  }

  render() {
    return <Host>{this.renderWrapperComponent()}</Host>;
  }
}
