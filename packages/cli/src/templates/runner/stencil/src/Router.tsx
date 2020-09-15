import { Component, Host, h, Prop } from "@stencil/core";
import { Route, match } from "stencil-router-v2";
##Router##

@Component({
  tag: "app-router",
})
export class AppRouter {
  @Prop() routes: any;
  @Prop() docs: any;

  render() {
    const Router = routerState.router;
    return (
      <Host>
        <Router.Switch>
          <Route path="/">
            <app-welcome routes={this.routes} />
          </Route>
          <Route path="/liveview">
            <app-liveview/>
          </Route>
          {Object.keys(this.routes.components).map((k) => {
            const component = this.routes.components[k];
            return (
              <Route path={component.url}>
                <app-playground
                  cmp={component.component}
                  data={this.docs.tags.filter((d) => d.name === component.component)[0]}
                ></app-playground>
              </Route>
            );
          })}
          {Object.keys(this.routes.routes).map((k) => {
            const route = this.routes.routes[k];
            const Component = route.component;

            if (route.url.indexOf("[") > -1) {
              const dynamicMatch = route.url.match(/\[.+\]/)[0];
              const paramName = dynamicMatch.replace("[", "").replace("]", "");
              const raw = route.url.replace(dynamicMatch, "");
              const newUrl = raw + ":" + paramName;
              return (
                <Route
                  path={match(newUrl, { exact: true })}
                  render={(router) => <Component param={router}></Component>}
                />
              );
            }
            return (
              <Route path={route.url}>
                <Component></Component>
              </Route>
            );
          })}
        </Router.Switch>
      </Host>
    );
  }
}
