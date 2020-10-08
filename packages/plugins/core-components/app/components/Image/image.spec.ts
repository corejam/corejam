import { newSpecPage } from "@stencil/core/testing";
import { Image } from "./Image";

it("should render a basic cj-ytpe component", async () => {
  const page = await newSpecPage({
    components: [Image],
    html: `<corejam-image src="https://www.google.de/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png"></corejam-image>`,
  });
  const img = page.root.shadowRoot.querySelectorAll("img");
  expect(img).toBeDefined();
});
