import { Component, h } from "@stencil/core";
import { match, Route } from "@stencil/router";
import { routerState, runState } from "../../store";
import { CorejamRoute } from "../../store/types";

const Router = routerState.router;

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
    return (
      <Router.Switch>
        {routes.map((route: CorejamRoute) => {
          const Component = route.component;

          //We have a canvasPage object coming in
          if (route.exact && route.canvasPage === true) {
            return (
              <Route
                path={match(route.url, { exact: true })}
                render={() => <div innerHTML={JSON.parse(route.component)}></div>}
              ></Route>
            );
          }

          if (route.exact && route.url.includes("component")) {
            return (
              <Route
                path={route.url}
                render={() => <corejam-dev-playground cmp={route.component}></corejam-dev-playground>}
              ></Route>
            );
          }

          if (route.exact && !route.dev && !route.third) {
            return <Route path={route.url} render={() => <Component></Component>}></Route>;
          }
          if (route.exact && (route.dev || route.third)) {
            return <Route path={route.url} render={() => <Component></Component>}></Route>;
          }
          return (
            <Route
              path={match(route.url, { exact: true })}
              render={(router) => <Component param={router}></Component>}
            ></Route>
          );
        })}
      </Router.Switch>
    );
  }
}
