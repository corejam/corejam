import { Component, Host, h } from "@stencil/core";
import { Route, match } from "stencil-router-v2";
import { state } from "@corejam/router";
import { CorejamRoute, runState } from "../../store/runStore";

const Router = state.router;

@Component({
  tag: "corejam-run-router",
})
export class AppRouter {
  render() {
    console.log(runState.routes)
    return (
      <Host>
        <Router.Switch>
          {runState.routes.map((route: CorejamRoute) => {
            const Component = route.component;

            //We have a canvasPage object coming in
            if (route.exact && route.canvasPage === true) {
              return (
                <Route
                  path={match(route.url, { exact: true })}>
                  <div innerHTML={JSON.parse(route.component)}></div>
                </Route>
              );
            }

            if (route.exact && route.url.includes("component"))
              return (
                <Route path={route.url}>
                  <app-playground cmp={route.component}></app-playground>
                </Route>
              );

            if (route.exact) {
              return (
                <Route path={route.url}>
                  <Component></Component>
                </Route>
              );
            }
            return (
              <Route
                path={match(route.url, { exact: true })}
                render={(router) => <Component param={router}></Component>}
              />
            );
          })}
        </Router.Switch>
      </Host>
    );
  }
}
