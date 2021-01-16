import { Component, Host, h } from "@stencil/core";
import { href } from "@stencil/router";
import { runState } from "@corejam/run";

@Component({
  tag: "app-welcome",
})
export class Welcome {
  render() {
    const styles = {
      fontFamily: "Tahoma",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      height: "95vh",
    };

    return (
      <Host>
        <div class="app" style={styles}>
          <div>
            <h1>Welcome to corejam</h1>
            <div>
              <h3>Components</h3>
              <ul>
                {runState.routes.map((route) => {
                  if (route.url.includes("component"))
                    return (
                      <li>
                        <a {...href(route.url, runState.router)}>{route.component}</a>
                      </li>
                    );
                })}
              </ul>
            </div>
            <div>
              <h3>Routes</h3>
              <ul>
                {runState.routes.map((route) => {
                  if (!route.url.includes("component"))
                    return (
                      <li>
                        <a {...href(route.url, runState.router)}>{route.component}</a>
                      </li>
                    );
                })}
              </ul>
            </div>
          </div>
        </div>
      </Host>
    );
  }
}
