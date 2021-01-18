import { Component, Host, h } from "@stencil/core";
import { Route, match } from "stencil-router-v2";
import { CorejamRoute, runState } from "../../store/runStore";

const Router = runState.router;

@Component({
  tag: "corejam-router",
})
export class CorejamRouter {
  collectRoutesInRightOrder() {
    let routes = [];

    runState.routes.forEach((route: CorejamRoute) => {
      if (route.exact && route.canvasPage === true) {
        routes = [...routes, route];
      } else if (route.exact && route.url.includes("component")) {
        routes = [route, ...routes];
      } else if (route.exact) {
        routes = [route, ...routes];
      } else {
        routes = [...routes, route];
      }
    });
    runState.plugins.forEach((plugin) =>
      plugin.router.routes.forEach((route) => {
        if (route.exact && route.canvasPage === true) {
          routes = [...routes, route];
        } else if (route.exact && route.url.includes("component")) {
          routes = [route, ...routes];
        } else if (route.exact) {
          routes = [route, ...routes];
        } else {
          routes = [...routes, route];
        }
      })
    );
    return routes;
  }

  render() {
    const routes = this.collectRoutesInRightOrder();
    const Layout = runState.layout ? runState.layout[0].component : "div";
    return (
      <Host>
        <Router.Switch>
          {routes.map((route: CorejamRoute) => {
            const Component = route.component;
            //We have a canvasPage object coming in
            if (route.exact && route.canvasPage === true) {
              return (
                <Route path={match(route.url, { exact: true })}>
                  <div innerHTML={JSON.parse(route.component)}></div>
                </Route>
              );
            }

            if (route.exact && route.url.includes("component")) {
              return (
                <Route path={route.url}>
                  <corejam-dev-playground cmp={route.component}></corejam-dev-playground>
                </Route>
              );
            }

            if (route.exact && !route.dev && !route.third) {
              return (
                <Route path={route.url}>
                  <Layout>
                    <Component></Component>
                  </Layout>
                </Route>
              );
            }
            if (route.exact && (route.dev || route.third)) {
              return (
                <Route path={route.url}>
                  <Component></Component>
                </Route>
              );
            }
            return (
              <Route
                path={match(route.url, { exact: true })}
                render={(router) => (
                  <Layout>
                    <Component param={router}></Component>
                  </Layout>
                )}
              />
            );
          })}
        </Router.Switch>
      </Host>
    );
  }
}
