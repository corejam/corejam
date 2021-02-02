import { Component, Host, h } from "@stencil/core";
import { runState, href } from "../../store/runStore";

@Component({
  tag: "corejam-dev-welcome",
})
export class Welcome {
  render() {
    const styles = {
      fontFamily: "Tahoma",
      display: "flex",
      justifyContent: "center",
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
              {runState.routes.length > 0 && <h3>Routes</h3>}
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
            <div>
              {runState.plugins.length > 0 && <h3>Plugins</h3>}
              <ul>
                {runState.plugins.map((plugin) => {
                  return (
                    <div>
                      <h4>{plugin.name}</h4>
                      <h5>Routes</h5>
                      <ul>
                        {plugin.router.routes.map((route) => {
                          return (
                            <li>
                              <a {...href(route.url, runState.router)}>{route.component}</a>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
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
