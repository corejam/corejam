import { Component, Host, h, State } from "@stencil/core";
import { runState } from "../../store/runStore";

@Component({
  tag: "corejam-run-app",
})
export class CorejamRun {
  @State() config: any;
  async componentWillLoad() {
    return new Promise(async (res) => {
      try {
        const buildConfig = await fetch("/build/config.json");
        const config = await buildConfig.json();
        this.config = config;
        runState.routes = config.router.routes;
        runState.wrapper = config.wrapper;
        runState.recommendations = config.recommendations;
        runState.mode = config.mode;
        runState.layout = config.layout;
        res();
        // if (process.env.MODE !== "static") {
        //   const docs = await fetch("/assets/custom-elements.json");
        //   if (docs) {
        //     const data = await docs.json();
        //     this.docs = data;
        //     res();
        //   }
        // }
      } catch (e) {
        console.log(e);
      }
    });
  }

  renderRecos() {
    if (this.config.recommendations.length > 0) {
      return this.config.recommendations.map((reco) => {
        const Reco = reco;
        return <Reco></Reco>;
      });
    }
  }

  renderLayout(children: [JSX.Element]) {
    if (this.config.layout) {
      const Layout = this.config.layout.component;
      return <Layout>{children}</Layout>;
    }
    return children;
  }

  renderWrapperComponent() {
    if (this.config.wrapper.length > 0) {
      /**
       * TODO
       * Check if multiple wrapper components.
       */
      const Wrapper = this.config.wrapper[0];
      return (
        <Wrapper>
          {this.renderRecos()}
          {this.renderLayout(<corejam-run-router />)}
        </Wrapper>
      );
    }
    return [this.renderRecos(), this.renderLayout(<corejam-run-router></corejam-run-router>)];
  }

  render() {
    console.log("render app");
    return <Host>{this.renderWrapperComponent()}</Host>;
  }
}
