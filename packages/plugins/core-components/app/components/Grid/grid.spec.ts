import { newSpecPage } from "@stencil/core/testing";
import { Grid } from "./Grid";

it("should render grid compoment", async () => {
  const page = await newSpecPage({
    components: [Grid],
    html: `<corejam-grid>hallo</corejam-grid>`,
  });
  expect(page).toBeDefined();
});

it("should render grid template columns markup", async () => {
  const page = await newSpecPage({
    components: [Grid],
    html: `<corejam-grid template-columns="3">hallo</corejam-grid>`,
  });
  expect(page.doc.head.querySelector("style[corejamstyle]").textContent).toContain(
    "grid-template-columns: repeat(3, minmax(0, 1fr));"
  );
});

it("should render grid template columns markup with none prop", async () => {
  const page = await newSpecPage({
    components: [Grid],
    html: `<corejam-grid template-columns="none">hallo</corejam-grid>`,
  });
  expect(page.doc.head.querySelector("style[corejamstyle]").textContent).toContain("grid-template-columns: none;");
});

it("should render grid columns markup", async () => {
  const page = await newSpecPage({
    components: [Grid],
    html: `<corejam-grid cols="auto">hallo</corejam-grid>`,
  });
  expect(page.doc.head.querySelector("style[corejamstyle]").textContent).toContain("grid-column: auto;");
});

it("should render grid columns span markup", async () => {
  const page = await newSpecPage({
    components: [Grid],
    html: `<corejam-grid cols="1">hallo</corejam-grid>`,
  });
  expect(page.doc.head.querySelector("style[corejamstyle]").textContent).toContain("grid-column: span 1 / span 1;");
});

it("should render grid columns start markup", async () => {
  const page = await newSpecPage({
    components: [Grid],
    html: `<corejam-grid cols-start="1">hallo</corejam-grid>`,
  });
  expect(page.doc.head.querySelector("style[corejamstyle]").textContent).toContain("grid-column-start: 1;");
});

it("should render grid columns start markup with auto", async () => {
  const page = await newSpecPage({
    components: [Grid],
    html: `<corejam-grid cols-start="auto">hallo</corejam-grid>`,
  });
  expect(page.doc.head.querySelector("style[corejamstyle]").textContent).toContain("grid-column-start: auto;");
});

it("should render grid columns end markup", async () => {
  const page = await newSpecPage({
    components: [Grid],
    html: `<corejam-grid cols-end="1">hallo</corejam-grid>`,
  });
  expect(page.doc.head.querySelector("style[corejamstyle]").textContent).toContain("grid-column-end: 1;");
});

it("should render grid columns end markup with auto", async () => {
  const page = await newSpecPage({
    components: [Grid],
    html: `<corejam-grid cols-end="auto">hallo</corejam-grid>`,
  });
  expect(page.doc.head.querySelector("style[corejamstyle]").textContent).toContain("grid-column-end: auto;");
});

it("should render grid row", async () => {
  const page = await newSpecPage({
    components: [Grid],
    html: `<corejam-grid template-rows="1">hallo</corejam-grid>`,
  });
  expect(page.doc.head.querySelector("style[corejamstyle]").textContent).toContain(
    "grid-template-rows: repeat(1, minmax(0, 1fr));"
  );
});

it("should render grid row none", async () => {
  const page = await newSpecPage({
    components: [Grid],
    html: `<corejam-grid template-rows="none">hallo</corejam-grid>`,
  });
  expect(page.doc.head.querySelector("style[corejamstyle]").textContent).toContain("grid-template-rows: none;");
});

it("should render grid columns markup", async () => {
  const page = await newSpecPage({
    components: [Grid],
    html: `<corejam-grid cols="auto">hallo</corejam-grid>`,
  });
  expect(page.doc.head.querySelector("style[corejamstyle]").textContent).toContain("grid-column: auto;");
});

it("should render grid columns span markup", async () => {
  const page = await newSpecPage({
    components: [Grid],
    html: `<corejam-grid cols="1">hallo</corejam-grid>`,
  });
  expect(page.doc.head.querySelector("style[corejamstyle]").textContent).toContain("grid-column: span 1 / span 1;");
});

it("should render grid columns start markup", async () => {
  const page = await newSpecPage({
    components: [Grid],
    html: `<corejam-grid cols-start="1">hallo</corejam-grid>`,
  });
  expect(page.doc.head.querySelector("style[corejamstyle]").textContent).toContain("grid-column-start: 1;");
});

it("should render grid columns start markup with auto", async () => {
  const page = await newSpecPage({
    components: [Grid],
    html: `<corejam-grid cols-start="auto">hallo</corejam-grid>`,
  });
  expect(page.doc.head.querySelector("style[corejamstyle]").textContent).toContain("grid-column-start: auto;");
});

it("should render grid columns end markup", async () => {
  const page = await newSpecPage({
    components: [Grid],
    html: `<corejam-grid cols-end="1">hallo</corejam-grid>`,
  });
  expect(page.doc.head.querySelector("style[corejamstyle]").textContent).toContain("grid-column-end: 1;");
});

it("should render grid columns end markup with auto", async () => {
  const page = await newSpecPage({
    components: [Grid],
    html: `<corejam-grid cols-end="auto">hallo</corejam-grid>`,
  });
  expect(page.doc.head.querySelector("style[corejamstyle]").textContent).toContain("grid-column-end: auto;");
});

it("should render grid rows markup with auto", async () => {
  const page = await newSpecPage({
    components: [Grid],
    html: `<corejam-grid rows="auto">hallo</corejam-grid>`,
  });
  expect(page.doc.head.querySelector("style[corejamstyle]").textContent).toContain("grid-row: auto;");
});

it("should render grid rows span markup", async () => {
  const page = await newSpecPage({
    components: [Grid],
    html: `<corejam-grid rows="1">hallo</corejam-grid>`,
  });
  expect(page.doc.head.querySelector("style[corejamstyle]").textContent).toContain("grid-row: span 1 / span 1;");
});

it("should render grid rows start markup", async () => {
  const page = await newSpecPage({
    components: [Grid],
    html: `<corejam-grid rows-start="1">hallo</corejam-grid>`,
  });
  expect(page.doc.head.querySelector("style[corejamstyle]").textContent).toContain("grid-row-start: 1;");
});

it("should render grid rows start markup with auto", async () => {
  const page = await newSpecPage({
    components: [Grid],
    html: `<corejam-grid rows-start="auto">hallo</corejam-grid>`,
  });
  expect(page.doc.head.querySelector("style[corejamstyle]").textContent).toContain("grid-row-start: auto;");
});

it("should render grid row end markup", async () => {
  const page = await newSpecPage({
    components: [Grid],
    html: `<corejam-grid rows-end="1">hallo</corejam-grid>`,
  });
  expect(page.doc.head.querySelector("style[corejamstyle]").textContent).toContain("grid-row-end: 1;");
});

it("should render grid rows end markup with auto", async () => {
  const page = await newSpecPage({
    components: [Grid],
    html: `<corejam-grid rows-end="auto">hallo</corejam-grid>`,
  });
  expect(page.doc.head.querySelector("style[corejamstyle]").textContent).toContain("grid-row-end: auto;");
});

it("should render grid gap markup", async () => {
  const page = await newSpecPage({
    components: [Grid],
    html: `<corejam-grid gap="0">hallo</corejam-grid>`,
  });
  expect(page.doc.head.querySelector("style[corejamstyle]").textContent).toContain("gap: 0;");
});

it("should render grid gap markup", async () => {
  const page = await newSpecPage({
    components: [Grid],
    html: `<corejam-grid gap="1">hallo</corejam-grid>`,
  });
  expect(page.doc.head.querySelector("style[corejamstyle]").textContent).toContain(
    "gap: calc(var(--cj-grid-multiplier, 0.25) * 1rem);"
  );
});

it("should render grid gap column markup", async () => {
  const page = await newSpecPage({
    components: [Grid],
    html: `<corejam-grid gap-col="1">hallo</corejam-grid>`,
  });
  expect(page.doc.head.querySelector("style[corejamstyle]").textContent).toContain(
    "column-gap: calc(var(--cj-grid-multiplier, 0.25) * 1rem);"
  );
});

it("should render grid gap row markup", async () => {
  const page = await newSpecPage({
    components: [Grid],
    html: `<corejam-grid gap-row="1">hallo</corejam-grid>`,
  });
  expect(page.doc.head.querySelector("style[corejamstyle]").textContent).toContain(
    "row-gap: calc(var(--cj-grid-multiplier, 0.25) * 1rem);"
  );
});

it("should render grid flow markup", async () => {
  const page = await newSpecPage({
    components: [Grid],
    html: `<corejam-grid auto-flow="row">hallo</corejam-grid>`,
  });
  expect(page.doc.head.querySelector("style[corejamstyle]").textContent).toContain("grid-auto-flow: row;");
});

it("should render grid flow markup", async () => {
  const page = await newSpecPage({
    components: [Grid],
    html: `<corejam-grid auto-flow="column">hallo</corejam-grid>`,
  });
  expect(page.doc.head.querySelector("style[corejamstyle]").textContent).toContain("grid-auto-flow: column;");
});

it("should render grid flow markup", async () => {
  const page = await newSpecPage({
    components: [Grid],
    html: `<corejam-grid auto-flow="row-dense">hallo</corejam-grid>`,
  });
  expect(page.doc.head.querySelector("style[corejamstyle]").textContent).toContain("grid-auto-flow: row-dense;");
});

it("should render grid flow markup", async () => {
  const page = await newSpecPage({
    components: [Grid],
    html: `<corejam-grid auto-flow="column-dense">hallo</corejam-grid>`,
  });
  expect(page.doc.head.querySelector("style[corejamstyle]").textContent).toContain("grid-auto-flow: column-dense;");
});
