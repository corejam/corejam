import { Component, Host, h, Prop } from "@stencil/core";
import { href } from "stencil-router-v2";

@Component({
  tag: "app-welcome",
  shadow: true,
})
export class Welcome {
  @Prop() routes: any;

  formatUrl(url: string) {
    return url.replace("/", "").replace("component/", "");
  }
  renderAnchorTag(url: string) {
    if (url.indexOf("[") > -1) {
      const dynamicMatch = url.match(/\[.+\]/)[0];
      const urlWithoutParams = url.replace(dynamicMatch, "");
      return <a {...href(urlWithoutParams + "1")}>{this.formatUrl(url)}</a>;
    }
    return <a {...href(url)}>{this.formatUrl(url)}</a>;
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
            {process.env.MODE !== "static" && (
              <div>
                <h3>Components</h3>
                <ul>
                  {Object.keys(this.routes.components).map((k) => {
                    const route = this.routes.components[k];
                    return (
                      <li>
                        <a {...href(route.url)}>{this.formatUrl(route.url)}</a>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
            {this.routes.routes.length > 0 && <h3>Routes</h3>}
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
