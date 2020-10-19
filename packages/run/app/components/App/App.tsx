import { Component, Host, h, State } from "@stencil/core";

type mapEntry = {
  component: string;
};

type mapEntryWithUrl = mapEntry & {
  url: string;
};

@Component({
  tag: "corejam-run-app",
})
export class AppRoot {
  @State() components: [mapEntryWithUrl] | [];
  @State() routes: [mapEntryWithUrl] | [];
  @State() wrapper: [string] | [];
  @State() recos: Array<string>;
  @State() layout: mapEntry | null;
  @State() docs: any = [];
  @State() mode: string;

  async componentWillLoad() {
    return new Promise(async (res) => {
      try {
        const buildConfig = await fetch("/build/config.json");
        const config = await buildConfig.json();
        if (config) {
          this.components = config.components;
          this.routes = config.routes;
          this.wrapper = config.wrapper;
          this.recos = config.recommendations;
          this.mode = config.mode;
          this.layout = config.layout;
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
    if (this.recos.length > 0) {
      return this.recos.map((reco) => {
        const Reco = reco;
        return <Reco></Reco>;
      });
    }
  }

  renderLayout(children: [JSX.Element]) {
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
          {this.renderLayout(<corejam-run-router routes={this.routes} components={this.components} mode={this.mode} />)}
        </Wrapper>
      );
    }
    return [
      this.renderRecos(),
      this.renderLayout(<corejam-run-router routes={this.routes} components={this.components} mode={this.mode} />),
    ];
  }

  render() {
    return <Host>{this.renderWrapperComponent()}</Host>;
  }
}
