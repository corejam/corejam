import { Component, Host, h, Prop } from "@stencil/core";
import { Route, match } from "stencil-router-v2";
import { state } from "@corejam/router";

const Router = state.router;

@Component({
  tag: "app-router",
})
export class AppRouter {
  @Prop() routes: any;
  @Prop() docs: any;
  @Prop() mode: string;

  caculateRoutes() {
    const wildcards = [];
    const named = [];
    if (this.routes.routes) {
      Object.keys(this.routes.routes).map((k) => {
        const route = this.routes.routes[k];
        const Component = route.component;
        if (route.url.indexOf("[") > -1) {
          const dynamicMatch = route.url.match(/\[.+\]/)[0];
          const paramName = dynamicMatch.replace("[", "").replace("]", "");
          const raw = route.url.replace(dynamicMatch, "");
          const newUrl = raw + ":" + paramName;
          return wildcards.push(
            <Route path={match(newUrl, { exact: true })} render={(router) => <Component param={router}></Component>} />
          );
        }
        return named.push(
          <Route path={route.url}>
            <Component></Component>
          </Route>
        );
      });
      return [...named, ...wildcards];
    }
  }

  render() {
    return (
      <Host>
        <Router.Switch>
          <Route path="/_corejam/">
            <app-welcome routes={this.routes} mode={this.mode} />
          </Route>
          <Route path="/liveview">
            <app-liveview />
          </Route>
          {this.routes &&
            Object.keys(this.routes.components).map((k) => {
              const component = this.routes.components[k];
              return (
                <Route path={component.url}>
                  <app-playground
                    cmp={component.component}
                    // data={this.docs.tags.filter((d) => d.name === component.component)[0]}
                  ></app-playground>
                </Route>
              );
            })}
          {this.caculateRoutes()}
        </Router.Switch>
      </Host>
    );
  }
}
