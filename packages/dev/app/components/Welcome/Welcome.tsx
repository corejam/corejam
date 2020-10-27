import { Component, Host, h, Prop, Fragment } from "@stencil/core";
import { href } from "stencil-router-v2";
import { state } from "@corejam/router";
@Component({
  tag: "app-welcome",
})
export class Welcome {
  @Prop() routes: any;
  @Prop() components: any;
  @Prop() mode: string;
  formatUrl(url: string) {
    return url.replace("/component/", "");
  }
  renderAnchorTag(url: string) {
    if (url.indexOf("[") > -1) {
      const dynamicMatch = url.match(/\[.+\]/)[0];
      const urlWithoutParams = "/_corejam/component/" + url.replace(dynamicMatch, "");
      return <a {...href(urlWithoutParams + "1", state.router)}>{url}</a>;
    }
    return <a {...href(url, state.router)}>{this.formatUrl(url)}</a>;
  }
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
          {this.mode !== "static" && (
            <div>
              <h1>Welcome to corejam</h1>
              <div>
                <h3>Components</h3>
                <ul>
                  {this.components.map((route) => {
                    return (
                      <li>
                        <a {...href(route.url, state.router)}>{this.formatUrl(route.url)}</a>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          )}
          {this.routes && this.routes.length > 0 && (
            <Fragment>
              <h3>Routes</h3>
              <ul>
                {this.routes.map((route) => {
                  return <li>{this.renderAnchorTag(route.url)}</li>;
                })}
              </ul>
            </Fragment>
          )}
        </div>
      </Host>
    );
  }
}
