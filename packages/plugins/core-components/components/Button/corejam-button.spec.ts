import { newSpecPage } from "@stencil/core/testing";
import { CorejamButton } from "./corejam-button";

describe("corejam-button", () => {
  it("renders", async () => {
    const page = await newSpecPage({
      components: [CorejamButton],
      html: `<corejam-button></corejam-button>`,
    });
    expect(page.root).toBeDefined();
  });

  it("should render type based on prop", async () => {
    const page = await newSpecPage({
      components: [CorejamButton],
      html: `<corejam-button type="submit">hallo</corejam-button>`,
    });
    expect(page.root).toBeDefined();
  });

  it("should render background based on prop", async () => {
    const page = await newSpecPage({
      components: [CorejamButton],
      html: `<corejam-button bg="black">hallo</corejam-button>`,
    });
    const computedStyleRules = page.root.shadowRoot.querySelector("style").innerText;
    expect(computedStyleRules).toContain("background: var(--cj-color-black);");
  });

  it("should render color based on prop", async () => {
    const page = await newSpecPage({
      components: [CorejamButton],
      html: `<corejam-button color="white">hallo</corejam-button>`,
    });
    const computedStyleRules = page.root.shadowRoot.querySelector("style").innerText;
    expect(computedStyleRules).toContain("color: var(--cj-color-white)");
  });
});
