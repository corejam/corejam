import { newSpecPage } from "@stencil/core/testing";
import { CorejamType } from "./type";

it("should render a basic cj-ytpe component", async () => {
  const page = await newSpecPage({
    components: [CorejamType],
    html: `<corejam-type>Hallo</corejam-type>`,
  });
  expect(page.root).toBeDefined();
});

it("should render font size based on prop", async () => {
  const page = await newSpecPage({
    components: [CorejamType],
    html: `<corejam-type size="6xl">Hallo</corejam-type>`,
  });
  const computedStyleRules = page.doc.head.querySelector("style[corejamstyle]").textContent;
  expect(computedStyleRules).toContain("font-size: var(--cj-font-size-6xl, 4rem);");
});

it("should render italic font style", async () => {
  const page = await newSpecPage({
    components: [CorejamType],
    html: `<corejam-type font-style="italic">Hallo</corejam-type>`,
  });
  const computedStyleRules = page.doc.head.querySelector("style[corejamstyle]").textContent;
  expect(computedStyleRules).toContain("font-style: italic");
});

it("should render non-italic font style", async () => {
  const page = await newSpecPage({
    components: [CorejamType],
    html: `<corejam-type font-style="non-italic">Hallo</corejam-type>`,
  });
  const computedStyleRules = page.doc.head.querySelector("style[corejamstyle]").textContent;
  expect(computedStyleRules).toContain("font-style: non-italic");
});

it("should render tighter letter spacing", async () => {
  const page = await newSpecPage({
    components: [CorejamType],
    html: `<corejam-type spacing="tighter">Hallo</corejam-type>`,
  });
  const computedStyleRules = page.doc.head.querySelector("style[corejamstyle]").textContent;
  expect(computedStyleRules).toContain("letter-spacing: var(--cj-font-spacing-tighter, -0.05em)");
});

it("should render tight letter spacing", async () => {
  const page = await newSpecPage({
    components: [CorejamType],
    html: `<corejam-type spacing="tight">Hallo</corejam-type>`,
  });
  const computedStyleRules = page.doc.head.querySelector("style[corejamstyle]").textContent;
  expect(computedStyleRules).toContain("letter-spacing: var(--cj-font-spacing-tight, -0.025em)");
});

it("should render normal letter spacing", async () => {
  const page = await newSpecPage({
    components: [CorejamType],
    html: `<corejam-type spacing="normal">Hallo</corejam-type>`,
  });
  const computedStyleRules = page.doc.head.querySelector("style[corejamstyle]").textContent;
  expect(computedStyleRules).toContain("letter-spacing: var(--cj-font-spacing-normal, 0)");
});
it("should render wide letter spacing", async () => {
  const page = await newSpecPage({
    components: [CorejamType],
    html: `<corejam-type spacing="wide">Hallo</corejam-type>`,
  });
  const computedStyleRules = page.doc.head.querySelector("style[corejamstyle]").textContent;
  expect(computedStyleRules).toContain("letter-spacing: var(--cj-font-spacing-wide, 0.025em)");
});
it("should render wider letter spacing", async () => {
  const page = await newSpecPage({
    components: [CorejamType],
    html: `<corejam-type spacing="wider">Hallo</corejam-type>`,
  });
  const computedStyleRules = page.doc.head.querySelector("style[corejamstyle]").textContent;
  expect(computedStyleRules).toContain("letter-spacing: var(--cj-font-spacing-wider, 0.05em)");
});

it("should render widest letter spacing", async () => {
  const page = await newSpecPage({
    components: [CorejamType],
    html: `<corejam-type spacing="widest">Hallo</corejam-type>`,
  });
  const computedStyleRules = page.doc.head.querySelector("style[corejamstyle]").textContent;
  expect(computedStyleRules).toContain("letter-spacing: var(--cj-font-spacing-widest, 0.1em)");
});

it("should render underline text", async () => {
  const page = await newSpecPage({
    components: [CorejamType],
    html: `<corejam-type decoration="underline">Hallo</corejam-type>`,
  });
  const computedStyleRules = page.doc.head.querySelector("style[corejamstyle]").textContent;
  expect(computedStyleRules).toContain("text-decoration: underline");
});
it("should render underline text", async () => {
  const page = await newSpecPage({
    components: [CorejamType],
    html: `<corejam-type decoration="underline">Hallo</corejam-type>`,
  });
  const computedStyleRules = page.doc.head.querySelector("style[corejamstyle]").textContent;
  expect(computedStyleRules).toContain("text-decoration: underline");
});
it("should render no underline text", async () => {
  const page = await newSpecPage({
    components: [CorejamType],
    html: `<corejam-type decoration="no-underline">Hallo</corejam-type>`,
  });
  const computedStyleRules = page.doc.head.querySelector("style[corejamstyle]").textContent;
  expect(computedStyleRules).toContain("text-decoration: none");
});
it("should render line through text", async () => {
  const page = await newSpecPage({
    components: [CorejamType],
    html: `<corejam-type decoration="line-through">Hallo</corejam-type>`,
  });
  const computedStyleRules = page.doc.head.querySelector("style[corejamstyle]").textContent;
  expect(computedStyleRules).toContain("text-decoration: line-through");
});

it("should render uppercase text", async () => {
  const page = await newSpecPage({
    components: [CorejamType],
    html: `<corejam-type transform="uppercase">Hallo</corejam-type>`,
  });
  const computedStyleRules = page.doc.head.querySelector("style[corejamstyle]").textContent;
  expect(computedStyleRules).toContain("text-transform: uppercase");
});
it("should render lowercase text", async () => {
  const page = await newSpecPage({
    components: [CorejamType],
    html: `<corejam-type transform="lowercase">Hallo</corejam-type>`,
  });
  const computedStyleRules = page.doc.head.querySelector("style[corejamstyle]").textContent;
  expect(computedStyleRules).toContain("text-transform: lowercase");
});
it("should render normal text", async () => {
  const page = await newSpecPage({
    components: [CorejamType],
    html: `<corejam-type transform="normal-case">Hallo</corejam-type>`,
  });
  const computedStyleRules = page.doc.head.querySelector("style[corejamstyle]").textContent;
  expect(computedStyleRules).toContain("text-transform: none");
});

it("should render text as h1", async () => {
  const page = await newSpecPage({
    components: [CorejamType],
    html: `<corejam-type as="h1">Hallo</corejam-type>`,
  });
  const target = page.doc.querySelector("h1");
  expect(target).toBeTruthy();
});
it("should render text as h2", async () => {
  const page = await newSpecPage({
    components: [CorejamType],
    html: `<corejam-type as="h2">Hallo</corejam-type>`,
  });
  const target = page.doc.querySelector("h2");
  expect(target).toBeTruthy();
});
it("should render text as h3", async () => {
  const page = await newSpecPage({
    components: [CorejamType],
    html: `<corejam-type as="h3">Hallo</corejam-type>`,
  });
  const target = page.doc.querySelector("h3");
  expect(target).toBeTruthy();
});
it("should render text as h4", async () => {
  const page = await newSpecPage({
    components: [CorejamType],
    html: `<corejam-type as="h4">Hallo</corejam-type>`,
  });
  const target = page.doc.querySelector("h4");
  expect(target).toBeTruthy();
});
it("should render text as h5", async () => {
  const page = await newSpecPage({
    components: [CorejamType],
    html: `<corejam-type as="h5">Hallo</corejam-type>`,
  });
  const target = page.doc.querySelector("h5");
  expect(target).toBeTruthy();
});
it("should render text as h6", async () => {
  const page = await newSpecPage({
    components: [CorejamType],
    html: `<corejam-type as="h6">Hallo</corejam-type>`,
  });
  const target = page.doc.querySelector("h6");
  expect(target).toBeTruthy();
});
it("should render text as p", async () => {
  const page = await newSpecPage({
    components: [CorejamType],
    html: `<corejam-type as="p">Hallo</corejam-type>`,
  });
  const target = page.doc.querySelector("p");
  expect(target).toBeTruthy();
});
it("should render text as b", async () => {
  const page = await newSpecPage({
    components: [CorejamType],
    html: `<corejam-type as="b">Hallo</corejam-type>`,
  });
  const target = page.doc.querySelector("b");
  expect(target).toBeTruthy();
});
it("should render text as i", async () => {
  const page = await newSpecPage({
    components: [CorejamType],
    html: `<corejam-type as="i">Hallo</corejam-type>`,
  });
  const target = page.doc.querySelector("i");
  expect(target).toBeTruthy();
});
it("should render  span tag as default for text", async () => {
  const page = await newSpecPage({
    components: [CorejamType],
    html: `<corejam-type>Hallo</corejam-type>`,
  });
  const target = page.doc.querySelector("span");
  expect(target).toBeTruthy();
});

it("should render text align left", async () => {
  const page = await newSpecPage({
    components: [CorejamType],
    html: `<corejam-type as="h1" align="left">Hallo</corejam-type>`,
  });
  const computedStyleRules = page.doc.head.querySelector("style[corejamstyle]").textContent;
  expect(computedStyleRules).toContain("text-align: left");
});
it("should render text align center", async () => {
  const page = await newSpecPage({
    components: [CorejamType],
    html: `<corejam-type as="h1" align="center">Hallo</corejam-type>`,
  });
  const computedStyleRules = page.doc.head.querySelector("style[corejamstyle]").textContent;
  expect(computedStyleRules).toContain("text-align: center");
});
it("should render text align right", async () => {
  const page = await newSpecPage({
    components: [CorejamType],
    html: `<corejam-type as="h1" align="right">Hallo</corejam-type>`,
  });
  const computedStyleRules = page.doc.head.querySelector("style[corejamstyle]").textContent;
  expect(computedStyleRules).toContain("text-align: right");
});

it("should render custom font family", async () => {
  const page = await newSpecPage({
    components: [CorejamType],
    html: `<corejam-type family="Calibre">Hallo</corejam-type>`,
  });
  const computedStyleRules = page.doc.head.querySelector("style[corejamstyle]").textContent;
  expect(computedStyleRules).toContain("font-family: var(--cj-font-family-Calibre, Calibre)");
});

it("should render custom font size var", async () => {
  const page = await newSpecPage({
    components: [CorejamType],
    html: `<corejam-type size="mega">Hallo</corejam-type>`,
  });
  const computedStyleRules = page.doc.head.querySelector("style[corejamstyle]").textContent;
  expect(computedStyleRules).toContain("font-size: var(--cj-font-size-mega)");
});
