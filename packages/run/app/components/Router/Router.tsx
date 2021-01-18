import { Component, Host, h } from "@stencil/core";
import { Route, match } from "stencil-router-v2";
import { CorejamRoute, runState } from "../../store/runStore";

const Router = runState.router;

@Component({
  tag: "corejam-router",
})
export class CorejamRouter {
  renderPluginRoutes() {
    let routes = [];

    runState.routes.map((route: CorejamRoute) => {
      const Component = route.component;
      //We have a canvasPage object coming in
      if (route.exact && route.canvasPage === true) {
        routes = [...routes, route];
        return (
          <Route path={match(route.url, { exact: true })}>
            <div innerHTML={JSON.parse(route.component)}></div>
          </Route>
        );
      }

      if (route.exact && route.url.includes("component")) {
        routes = [route, ...routes];
        return (
          <Route path={route.url}>
            <corejam-dev-playground cmp={route.component}></corejam-dev-playground>
          </Route>
        );
      }

      if (route.exact) {
        routes = [route, ...routes];
        return (
          <Route path={route.url}>
            <Component></Component>
          </Route>
        );
      }
      routes = [...routes, route];
      return (
        <Route path={match(route.url, { exact: true })} render={(router) => <Component param={router}></Component>} />
      );
    });
    runState.plugins.forEach((plugin) =>
      plugin.router.routes.forEach((route) => {
        const Component = route.component;
        //We have a canvasPage object coming in
        if (route.exact && route.canvasPage === true) {
          routes = [...routes, route];
          <Route path={match(route.url, { exact: true })}>
            <div innerHTML={JSON.parse(route.component)}></div>
          </Route>;
        } else if (route.exact && route.url.includes("component")) {
          routes = [route, ...routes];
          <Route path={route.url}>
            <corejam-dev-playground cmp={route.component}></corejam-dev-playground>
          </Route>;
        } else if (route.exact) {
          routes = [route, ...routes];
          <Route path={route.url}>
            <Component></Component>
          </Route>;
        } else {
          routes = [...routes, route];
          <Route
            path={match(route.url, { exact: true })}
            render={(router) => <Component param={router}></Component>}
          />;
        }
      })
    );
    console.log(routes);
    return routes;
  }

  render() {
    const routes = this.renderPluginRoutes();
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

            // if (route.exact && route.url.includes("component")) {
            //   return (
            //     <Route path={route.url}>
            //       <corejam-dev-playground cmp={route.component}></corejam-dev-playground>
            //     </Route>
            //   );
            // }

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
