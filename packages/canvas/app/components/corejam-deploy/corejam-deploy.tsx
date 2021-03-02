import { coreState } from "@corejam/core-components";
import { runState } from "@corejam/run";
import { Component, h, Host } from "@stencil/core";
import gql from "graphql-tag";
import { PostCanvasGQL } from "../../../shared/graphql/Mutations";
import templateFnc from "./template";

@Component({
  tag: "corejam-deploy",
})
export class CorejamDeploy {
  async deploy(e: PointerEvent) {
    e.preventDefault();

    const styleTags = document.querySelectorAll("style");
    const stringifiedHtml = document.getElementsByTagName("corejam-canvas")[0].outerHTML;
    const name = window.prompt("name");

    if (name) {
      const request = await coreState.client.mutate({
        mutation: gql(PostCanvasGQL),
        variables: {
          canvasPageInput: {
            canvas: JSON.stringify(templateFnc(stringifiedHtml, styleTags, name)),
            seo: {
              url: name,
            },
          },
        },
      });

      if (request.data.canvasPageCreate.id) {
        runState.routes = [
          {
            url: `/${name}`,
            canvasPage: true,
            component: JSON.stringify(stringifiedHtml),
            exact: true,
          },
        ];

        runState.router.push(`/${name}`);
      }
    }
  }

  render() {
    return (
      <Host>
        <corejam-box flex direction="col" pt={24}>
          <corejam-type as="h3" size="lg" weight="hairline">
            Deploy to CDN
          </corejam-type>
          <corejam-button
            w="6"
            bg="green-200"
            hoverBg="green-300"
            p="2"
            color="gray-700"
            hoverColor="white"
            onPointerUp={this.deploy}
          >
            Deploy
          </corejam-button>
        </corejam-box>
      </Host>
    );
  }
}
