import { Component, Host, h, Prop } from "@stencil/core";
import { href } from "stencil-router-v2";
import { state } from "@corejam/router";
@Component({
  tag: "app-welcome",
  shadow: true,
})
export class Welcome {
  @Prop() routes: any;

  formatUrl(url: string) {
    return url.replace("/component/", "");
  }
  renderAnchorTag(url: string) {
    if (url.indexOf("[") > -1) {
      const dynamicMatch = url.match(/\[.+\]/)[0];
      const urlWithoutParams = url.replace(dynamicMatch, "");
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
          <div>
            <h1>Welcome to corejam</h1>
            <div>
              <h3>Components</h3>
              <ul>
                {this.routes &&
                  Object.keys(this.routes.components).map((k) => {
                    const route = this.routes.components[k];
                    return (
                      <li>
                        <a {...href(route.url, state.router)}>{this.formatUrl(route.url)}</a>
                      </li>
                    );
                  })}
              </ul>
            </div>
            {this.routes && this.routes.routes.length > 0 && <h3>Routes</h3>}
            <ul>
              {Object.keys(this.routes.routes).map((k) => {
                const route = this.routes.routes[k];
                return <li>{this.renderAnchorTag(route.url)}</li>;
              })}
            </ul>
          </div>
        </div>
      </Host>
    );
  }
}
