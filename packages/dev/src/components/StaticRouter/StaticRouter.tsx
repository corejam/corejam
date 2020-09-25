import { Component, Host, h, Prop, State } from "@stencil/core";
import { Route, match, createRouter } from "stencil-router-v2";

const Router = createRouter();

@Component({
  tag: "app-static-router",
})
export class AppStaticRouter {
  @Prop() routes: any;
  @Prop() docs: any;
  @State() router: any;

  render() {
    return (
      <Host>
        <Router.Switch>
          <Route path="/">
            <app-welcome routes={this.routes} />
          </Route>
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
