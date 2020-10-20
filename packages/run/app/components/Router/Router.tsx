import { Component, Host, h, Prop, Fragment } from "@stencil/core";
import { Route, match } from "stencil-router-v2";
import { state } from "@corejam/router";

const Router = state.router;

@Component({
  tag: "corejam-run-router",
})
export class AppRouter {
  @Prop() components: any;
  @Prop() routes: any;
  @Prop() docs: any;
  @Prop() mode: string;

  calculateRoutes() {
    const wildcards = [];
    const named = [];
    if (this.routes) {
      this.routes.forEach((route) => {
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
          {this.mode === "development" && (
            <Fragment>
              <Route path="/_corejam">
                <app-welcome routes={this.routes} components={this.components} />
              </Route>
              <Route path="/liveview">
                <app-liveview />
              </Route>
              {this.components.map((component) => {
                return (
                  <Route path={component.url}>
                    <app-playground
                      cmp={component.component}
                      // data={this.docs.tags.filter((d) => d.name === component.component)[0]}
                    ></app-playground>
                  </Route>
                );
              })}
            </Fragment>
          )}
          {this.calculateRoutes()}
        </Router.Switch>
      </Host>
    );
  }
}
