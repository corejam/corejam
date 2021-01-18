import { Component, Host, h, State, Fragment } from "@stencil/core";
import { runState } from "../../store/runStore";

@Component({
  tag: "corejam-app",
})
export class CorejamRun {
  @State() config: any;
  async componentWillLoad() {
    await this.getConfig();
  }

  async getConfig() {
    try {
      const buildConfig = await fetch("/build/config.json");
      const config = await buildConfig.json();
      this.config = config;
      runState.routes = config.router.routes;
      runState.wrapper = config.wrapper;
      runState.recommendations = config.recommendations;
      runState.mode = config.mode;
      runState.layout = config.layout;
      runState.plugins = config.plugins;
    } catch (e) {
      console.log(e);
    }
  }

  renderRecos() {
    if (this.config.recommendations.length > 0) {
      return this.config.recommendations.map((reco) => {
        const Reco = reco;
        return <Reco></Reco>;
      });
    }
  }

  renderWrapperComponent() {
    if (this.config.wrapper.length > 0) {
      let Res = (
        <Fragment>
          {this.renderRecos()}
          <corejam-router />
        </Fragment>
      );
      this.config.wrapper.reverse().forEach((component) => {
        const Component = component;
        Res = <Component>{Res}</Component>;
      });
      return Res;
    }
    return (
      <Fragment>
        {this.renderRecos()}
        <corejam-router></corejam-router>
      </Fragment>
    );
  }

  render() {
    return <Host>{this.renderWrapperComponent()}</Host>;
  }
}
