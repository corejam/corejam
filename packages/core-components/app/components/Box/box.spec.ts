import { newSpecPage } from "@stencil/core/testing";
import { CorejamBox } from "./box";

it("should render a basic corejam-box component", async () => {
  const page = await newSpecPage({
    components: [CorejamBox],
    html: `<corejam-box>Hallo</corejam-box>`,
  });
  expect(page.root).toBeDefined();
});

it("should render corresponding style tag based on provided props", async () => {
  const page = await newSpecPage({
    components: [CorejamBox],
    html: `<corejam-box flex="true" direction="col">hallo</corejam-box>`,
  });
  expect(page.doc.head.querySelector("style[corejamstyle]")).toBeDefined();
});

it("should render flex property", async () => {
  const page = await newSpecPage({
    components: [CorejamBox],
    html: `<corejam-box flex="true">hallo</corejam-box>`,
  });

  const computedStyleRules = page.doc.head.querySelector("style[corejamstyle]").textContent;
  expect(computedStyleRules).toContain("display: flex");
});

it("should render flex direction property", async () => {
  const page = await newSpecPage({
    components: [CorejamBox],
    html: `<corejam-box flex="true" direction="col">hallo</corejam-box>`,
  });

  const computedStyleRules = page.doc.head.querySelector("style[corejamstyle]").textContent;
  expect(computedStyleRules).toContain("flex-direction: column");
});

it("should render flex wrap property", async () => {
  const page = await newSpecPage({
    components: [CorejamBox],
    html: `<corejam-box flex="true" wrap="wrap">hallo</corejam-box>`,
  });

  const computedStyleRules = page.doc.head.querySelector("style[corejamstyle]").textContent;
  expect(computedStyleRules).toContain("flex-wrap: wrap");
});

it("should render flex justify property", async () => {
  const page = await newSpecPage({
    components: [CorejamBox],
    html: `<corejam-box flex="true" justify="center">hallo</corejam-box>`,
  });

  const computedStyleRules = page.doc.head.querySelector("style[corejamstyle]").textContent;
  expect(computedStyleRules).toContain("justify-content: center");
});

it("should render flex align items property", async () => {
  const page = await newSpecPage({
    components: [CorejamBox],
    html: `<corejam-box flex="true" items="center">hallo</corejam-box>`,
  });

  const computedStyleRules = page.doc.head.querySelector("style[corejamstyle]").textContent;
  expect(computedStyleRules).toContain("align-items: center");
});

it("should render flex align content property", async () => {
  const page = await newSpecPage({
    components: [CorejamBox],
    html: `<corejam-box flex="true" align-content="center">hallo</corejam-box>`,
  });

  const computedStyleRules = page.doc.head.querySelector("style[corejamstyle]").textContent;
  expect(computedStyleRules).toContain("align-content: center");
});

it("should render flex order property", async () => {
  const page = await newSpecPage({
    components: [CorejamBox],
    html: `<corejam-box flex="true" order="1">hallo</corejam-box>`,
  });

  const computedStyleRules = page.doc.head.querySelector("style[corejamstyle]").textContent;
  expect(computedStyleRules).toContain("order: 1");
});

it("should render flex grow property", async () => {
  const page = await newSpecPage({
    components: [CorejamBox],
    html: `<corejam-box flex="true" grow="1">hallo</corejam-box>`,
  });

  const computedStyleRules = page.doc.head.querySelector("style[corejamstyle]").textContent;
  expect(computedStyleRules).toContain("flex-grow: 1");
});

it("should render flex shrink property", async () => {
  const page = await newSpecPage({
    components: [CorejamBox],
    html: `<corejam-box flex="true" shrink="1">hallo</corejam-box>`,
  });

  const computedStyleRules = page.doc.head.querySelector("style[corejamstyle]").textContent;
  expect(computedStyleRules).toContain("flex-shrink: 1");
});

it("should render flex self property", async () => {
  const page = await newSpecPage({
    components: [CorejamBox],
    html: `<corejam-box flex="true" self="center">hallo</corejam-box>`,
  });

  const computedStyleRules = page.doc.head.querySelector("style[corejamstyle]").textContent;
  expect(computedStyleRules).toContain("align-self: center");
});

it("should render width", async () => {
  const page = await newSpecPage({
    components: [CorejamBox],
    html: `<corejam-box w="4">hallo</corejam-box>`,
  });
  const computedStyleRules = page.doc.head.querySelector("style[corejamstyle]").textContent;
  expect(computedStyleRules).toContain("width: 33.33%");
});

it("should render height", async () => {
  const page = await newSpecPage({
    components: [CorejamBox],
    html: `<corejam-box h="12px">hallo</corejam-box>`,
  });
  const computedStyleRules = page.doc.head.querySelector("style[corejamstyle]").textContent;
  expect(computedStyleRules).toContain("height: 12px");
});

it("should render padding props", async () => {
  const page = await newSpecPage({
    components: [CorejamBox],
    html: `<corejam-box p="4">hallo</corejam-box>`,
  });
  const computedStyleRules = page.doc.head.querySelector("style[corejamstyle]").textContent;
  expect(computedStyleRules).toContain("padding: calc(var(--cj-box-multiplier, 0.25) * 4rem);");
});

// it("should render responsive padding", async () => {
//   const page = await newSpecPage({
//     components: [CorejamBox],
//     html: `<corejam-box p="1" p-lg="6">hallo</corejam-box>`,
//   });
//   const computedStyleRules = page.doc.head.querySelector("style[corejamstyle]").textContent;
//   expect(computedStyleRules).toEqualHtml(
//     ":host, .cj1102097483 { padding: calc(var(--cj-box-multiplier, 0.25) * 1rem); } @media screen and (min-width: 1024px) { :host, .cj1102097483 { padding: calc(var(--cj-box-multiplier, 0.25) * 6rem); } }"
//   );
// });
it("should render padding top props", async () => {
  const page = await newSpecPage({
    components: [CorejamBox],
    html: `<corejam-box pt="4">hallo</corejam-box>`,
  });
  const computedStyleRules = page.doc.head.querySelector("style[corejamstyle]").textContent;
  expect(computedStyleRules).toContain("padding-top: calc(var(--cj-box-multiplier, 0.25) * 4rem);");
});

// it("should render responsive padding top", async () => {
//   const page = await newSpecPage({
//     components: [CorejamBox],
//     html: `<corejam-box pt="1" pt-lg="6">hallo</corejam-box>`,
//   });
//   const computedStyleRules = page.doc.head.querySelector("style[corejamstyle]").textContent;
//   expect(computedStyleRules).toEqualHtml(
//     ":host, .cj1305997643 { padding-top: calc(var(--cj-box-multiplier, 0.25) * 1rem); } @media screen and (min-width: 1024px) { :host, .cj1305997643 { padding-top: calc(var(--cj-box-multiplier, 0.25) * 6rem); } }"
//   );
// });

it("should render padding right props", async () => {
  const page = await newSpecPage({
    components: [CorejamBox],
    html: `<corejam-box pr="4">hallo</corejam-box>`,
  });
  const computedStyleRules = page.doc.head.querySelector("style[corejamstyle]").textContent;
  expect(computedStyleRules).toContain("padding-right: calc(var(--cj-box-multiplier, 0.25) * 4rem);");
});

// it("should render responsive padding right", async () => {
//   const page = await newSpecPage({
//     components: [CorejamBox],
//     html: `<corejam-box pr="1" pr-lg="6">hallo</corejam-box>`,
//   });
//   const computedStyleRules = page.doc.head.querySelector("style[corejamstyle]").textContent;
//   expect(computedStyleRules).toEqualHtml(
//     ":host, .cj1139279445 { padding-right: calc(var(--cj-box-multiplier, 0.25) * 1rem); } @media screen and (min-width: 1024px) { :host, .cj1139279445 { padding-right: calc(var(--cj-box-multiplier, 0.25) * 6rem); } }"
//   );
// });
it("should render padding bottom props", async () => {
  const page = await newSpecPage({
    components: [CorejamBox],
    html: `<corejam-box pb="4">hallo</corejam-box>`,
  });
  const computedStyleRules = page.doc.head.querySelector("style[corejamstyle]").textContent;
  expect(computedStyleRules).toContain("padding-bottom: calc(var(--cj-box-multiplier, 0.25) * 4rem);");
});

// it("should render responsive padding bottom", async () => {
//   const page = await newSpecPage({
//     components: [CorejamBox],
//     html: `<corejam-box pb="1" pb-lg="6">hallo</corejam-box>`,
//   });
//   const computedStyleRules = page.doc.head.querySelector("style[corejamstyle]").textContent;
//   expect(computedStyleRules).toEqualHtml(
//     ":host, .cj802006605 { padding-bottom: calc(var(--cj-box-multiplier, 0.25) * 1rem); } @media screen and (min-width: 1024px) { :host, .cj802006605 { padding-bottom: calc(var(--cj-box-multiplier, 0.25) * 6rem); } }"
//   );
// });
it("should render padding left props", async () => {
  const page = await newSpecPage({
    components: [CorejamBox],
    html: `<corejam-box pl="4">hallo</corejam-box>`,
  });
  const computedStyleRules = page.doc.head.querySelector("style[corejamstyle]").textContent;
  expect(computedStyleRules).toContain("padding-left: calc(var(--cj-box-multiplier, 0.25) * 4rem);");
});

// it("should render responsive padding left", async () => {
//   const page = await newSpecPage({
//     components: [CorejamBox],
//     html: `<corejam-box pl="1" pl-lg="6">hallo</corejam-box>`,
//   });
//   const computedStyleRules = page.doc.head.querySelector("style[corejamstyle]").textContent;
//   expect(computedStyleRules).toEqualHtml(
//     ":host, .cj638646149 { padding-left: calc(var(--cj-box-multiplier, 0.25) * 1rem); } @media screen and (min-width: 1024px) { :host, .cj638646149 { padding-left: calc(var(--cj-box-multiplier, 0.25) * 6rem); } }"
//   );
// });

// it("should render padding x axis shorthand props", async () => {
//   const page = await newSpecPage({
//     components: [CorejamBox],
//     html: `<corejam-box px="4">hallo</corejam-box>`,
//   });
//   const computedStyleRules = page.doc.head.querySelector("style[corejamstyle]").textContent;
//   expect(computedStyleRules).toEqualHtml(
//     ":host, .cj1580737333 { padding-left: calc(var(--cj-box-multiplier, 0.25) * 4rem); padding-right: calc(var(--cj-box-multiplier, 0.25) * 4rem); }"
//   );
// });

// it("should render responsive padding x shorthand props", async () => {
//   const page = await newSpecPage({
//     components: [CorejamBox],
//     html: `<corejam-box px="1" px-lg="6">hallo</corejam-box>`,
//   });
//   const computedStyleRules = page.doc.head.querySelector("style[corejamstyle]").textContent;
//   expect(computedStyleRules).toEqualHtml(
//     ":host, .cj247299440 { padding-left: calc(var(--cj-box-multiplier, 0.25) * 1rem); padding-right: calc(var(--cj-box-multiplier, 0.25) * 1rem); } @media screen and (min-width: 1024px) { :host, .cj247299440 { padding-left: calc(var(--cj-box-multiplier, 0.25) * 6rem); padding-right: calc(var(--cj-box-multiplier, 0.25) * 6rem); } }"
//   );
// });
// it("should render padding y axis shorthand props", async () => {
//   const page = await newSpecPage({
//     components: [CorejamBox],
//     html: `<corejam-box py="4">hallo</corejam-box>`,
//   });
//   const computedStyleRules = page.doc.head.querySelector("style[corejamstyle]").textContent;
//   expect(computedStyleRules).toEqualHtml(
//     ":host, .cj878359276 { padding-top: calc(var(--cj-box-multiplier, 0.25) * 4rem); padding-bottom: calc(var(--cj-box-multiplier, 0.25) * 4rem); }"
//   );
// });

// it("should render responsive padding y shorthand props", async () => {
//   const page = await newSpecPage({
//     components: [CorejamBox],
//     html: `<corejam-box py="1" py-lg="6">hallo</corejam-box>`,
//   });
//   const computedStyleRules = page.doc.head.querySelector("style[corejamstyle]").textContent;
//   expect(computedStyleRules).toEqualHtml(
//     ":host, .cj1654917232 { padding-top: calc(var(--cj-box-multiplier, 0.25) * 1rem); padding-bottom: calc(var(--cj-box-multiplier, 0.25) * 1rem); } @media screen and (min-width: 1024px) { :host, .cj1654917232 { padding-top: calc(var(--cj-box-multiplier, 0.25) * 6rem); padding-bottom: calc(var(--cj-box-multiplier, 0.25) * 6rem); } }"
//   );
// });

it("should render margin top props", async () => {
  const page = await newSpecPage({
    components: [CorejamBox],
    html: `<corejam-box mt="4">hallo</corejam-box>`,
  });
  const computedStyleRules = page.doc.head.querySelector("style[corejamstyle]").textContent;
  expect(computedStyleRules).toContain("margin-top: calc(var(--cj-box-multiplier, 0.25) * 4rem);");
});

// it("should render responsive margin top", async () => {
//   const page = await newSpecPage({
//     components: [CorejamBox],
//     html: `<corejam-box mt="1" mt-lg="6">hallo</corejam-box>`,
//   });
//   const computedStyleRules = page.doc.head.querySelector("style[corejamstyle]").textContent;
//   expect(computedStyleRules).toEqualHtml(
//     ":host, .cj641159509 { margin-top: calc(var(--cj-box-multiplier, 0.25) * 1rem); } @media screen and (min-width: 1024px) { :host, .cj641159509 { margin-top: calc(var(--cj-box-multiplier, 0.25) * 6rem); } }"
//   );
// });

it("should render margin right props", async () => {
  const page = await newSpecPage({
    components: [CorejamBox],
    html: `<corejam-box mr="4">hallo</corejam-box>`,
  });
  const computedStyleRules = page.doc.head.querySelector("style[corejamstyle]").textContent;
  expect(computedStyleRules).toContain("margin-right: calc(var(--cj-box-multiplier, 0.25) * 4rem);");
});

// it("should render responsive margin right", async () => {
//   const page = await newSpecPage({
//     components: [CorejamBox],
//     html: `<corejam-box mr="1" mr-lg="6">hallo</corejam-box>`,
//   });
//   const computedStyleRules = page.doc.head.querySelector("style[corejamstyle]").textContent;
//   expect(computedStyleRules).toEqualHtml(
//     ":host, .cj452772729 { margin-right: calc(var(--cj-box-multiplier, 0.25) * 1rem); } @media screen and (min-width: 1024px) { :host, .cj452772729 { margin-right: calc(var(--cj-box-multiplier, 0.25) * 6rem); } }"
//   );
// });

// it("should render margin bottom props", async () => {
//   const page = await newSpecPage({
//     components: [CorejamBox],
//     html: `<corejam-box mb="4">hallo</corejam-box>`,
//   });
//   const computedStyleRules = page.doc.head.querySelector("style[corejamstyle]").textContent;
//   expect(computedStyleRules).toContain(":margin-bottom: calc(var(--cj-box-multiplier, 0.25) * 4rem);");
// });

// it("should render responsive margin bottom", async () => {
//   const page = await newSpecPage({
//     components: [CorejamBox],
//     html: `<corejam-box mb="1" mb-lg="6">hallo</corejam-box>`,
//   });
//   const computedStyleRules = page.doc.head.querySelector("style[corejamstyle]").textContent;
//   expect(computedStyleRules).toEqualHtml(
//     ":host, .cj1806091797 { margin-bottom: calc(var(--cj-box-multiplier, 0.25) * 1rem); } @media screen and (min-width: 1024px) { :host, .cj1806091797 { margin-bottom: calc(var(--cj-box-multiplier, 0.25) * 6rem); } }"
//   );
// });

it("should render margin left props", async () => {
  const page = await newSpecPage({
    components: [CorejamBox],
    html: `<corejam-box ml="4">hallo</corejam-box>`,
  });
  const computedStyleRules = page.doc.head.querySelector("style[corejamstyle]").textContent;
  expect(computedStyleRules).toContain("margin-left: calc(var(--cj-box-multiplier, 0.25) * 4rem);");
});

// it("should render responsive margin left", async () => {
//   const page = await newSpecPage({
//     components: [CorejamBox],
//     html: `<corejam-box ml="1" ml-lg="6">hallo</corejam-box>`,
//   });
//   const computedStyleRules = page.doc.head.querySelector("style[corejamstyle]").textContent;
//   expect(computedStyleRules).toEqualHtml(
//     ":host, .cj2065161643 { margin-left: calc(var(--cj-box-multiplier, 0.25) * 1rem); } @media screen and (min-width: 1024px) { :host, .cj2065161643 { margin-left: calc(var(--cj-box-multiplier, 0.25) * 6rem); } }"
//   );
// });

// it("should render margin x axis shorthand props", async () => {
//   const page = await newSpecPage({
//     components: [CorejamBox],
//     html: `<corejam-box mx="4">hallo</corejam-box>`,
//   });
//   const computedStyleRules = page.doc.head.querySelector("style[corejamstyle]").textContent;
//   expect(computedStyleRules).toEqualHtml(
//     ":host, .cj990538987 { margin-left: calc(var(--cj-box-multiplier, 0.25) * 4rem); margin-right: calc(var(--cj-box-multiplier, 0.25) * 4rem); }"
//   );
// });

it("should render margin x shorthand auto", async () => {
  const page = await newSpecPage({
    components: [CorejamBox],
    html: `<corejam-box mx="auto">hallo</corejam-box>`,
  });
  const computedStyleRules = page.doc.head.querySelector("style[corejamstyle]").textContent;
  expect(computedStyleRules).toContain("margin-left: auto");
  expect(computedStyleRules).toContain("margin-right: auto");
});

// it("should render responsive margin x shorthand props", async () => {
//   const page = await newSpecPage({
//     components: [CorejamBox],
//     html: `<corejam-box mx="1" mx-lg="6">hallo</corejam-box>`,
//   });
//   const computedStyleRules = page.doc.head.querySelector("style[corejamstyle]").textContent;
//   expect(computedStyleRules).toEqualHtml(
//     ":host, .cj764319842 { margin-left: calc(var(--cj-box-multiplier, 0.25) * 1rem); margin-right: calc(var(--cj-box-multiplier, 0.25) * 1rem); } @media screen and (min-width: 1024px) { :host, .cj764319842 { margin-left: calc(var(--cj-box-multiplier, 0.25) * 6rem); margin-right: calc(var(--cj-box-multiplier, 0.25) * 6rem); } }"
//   );
// });

// it("should render margin y axis shorthand props", async () => {
//   const page = await newSpecPage({
//     components: [CorejamBox],
//     html: `<corejam-box my="4">hallo</corejam-box>`,
//   });
//   const computedStyleRules = page.doc.head.querySelector("style[corejamstyle]").textContent;
//   expect(computedStyleRules).toEqualHtml(
//     ":host, .cj1460895960 { margin-top: calc(var(--cj-box-multiplier, 0.25) * 4rem); margin-bottom: calc(var(--cj-box-multiplier, 0.25) * 4rem); }"
//   );
// });

// it("should render margin y shorthand auto", async () => {
//   const page = await newSpecPage({
//     components: [CorejamBox],
//     html: `<corejam-box my="auto">hallo</corejam-box>`,
//   });
//   const computedStyleRules = page.doc.head.querySelector("style[corejamstyle]").textContent;
//   expect(computedStyleRules).toContain("margin-top: auto");
//   expect(computedStyleRules).toContain("margin-bottom: auto");
// });

// it("should render responsive margin y shorthand props", async () => {
//   const page = await newSpecPage({
//     components: [CorejamBox],
//     html: `<corejam-box my="1" my-lg="6">hallo</corejam-box>`,
//   });
//   const computedStyleRules = page.doc.head.querySelector("style[corejamstyle]").textContent;
//   expect(computedStyleRules).toEqualHtml(
//     ":host, .cj45687766 { margin-top: calc(var(--cj-box-multiplier, 0.25) * 1rem); margin-bottom: calc(var(--cj-box-multiplier, 0.25) * 1rem); } @media screen and (min-width: 1024px) { :host, .cj45687766 { margin-top: calc(var(--cj-box-multiplier, 0.25) * 6rem); margin-bottom: calc(var(--cj-box-multiplier, 0.25) * 6rem); } }"
//   );
// });

it("should render css based on max property", async () => {
  const page = await newSpecPage({
    components: [CorejamBox],
    html: `<corejam-box max="md">hallo</corejam-box>`,
  });
  const computedStyleRules = page.doc.head.querySelector("style[corejamstyle]").textContent;
  expect(computedStyleRules).toContain("max-width: var(--cj-screens-md);");
});

it("should render hide based on prop", async () => {
  const page = await newSpecPage({
    components: [CorejamBox],
    html: `<corejam-box hide="true">hallo</corejam-box>`,
  });
  const computedStyleRules = page.doc.head.querySelector("style[corejamstyle]").textContent;
  expect(computedStyleRules).toContain("display: none;");
});

it("should render border color based on prop", async () => {
  const page = await newSpecPage({
    components: [CorejamBox],
    html: `<corejam-box b-color="red-500">hallo</corejam-box>`,
  });
  const computedStyleRules = page.doc.head.querySelector("style[corejamstyle]").textContent;
  expect(computedStyleRules).toContain("border-color: var(--cj-colors-red-500)");
});

it("should render border round based on prop", async () => {
  const page = await newSpecPage({
    components: [CorejamBox],
    html: `<corejam-box rounded="sm">hallo</corejam-box>`,
  });
  const computedStyleRules = page.doc.head.querySelector("style[corejamstyle]").textContent;
  expect(computedStyleRules).toContain("border-radius: 0.125rem;");
});

it("should render border round based on prop", async () => {
  const page = await newSpecPage({
    components: [CorejamBox],
    html: `<corejam-box rounded="none">hallo</corejam-box>`,
  });
  const computedStyleRules = page.doc.head.querySelector("style[corejamstyle]").textContent;
  expect(computedStyleRules).toContain("border-radius: 0");
});

it("should render border round based on prop", async () => {
  const page = await newSpecPage({
    components: [CorejamBox],
    html: `<corejam-box rounded="true">hallo</corejam-box>`,
  });
  const computedStyleRules = page.doc.head.querySelector("style[corejamstyle]").textContent;
  expect(computedStyleRules).toContain("border-radius: 0.25rem");
});

it("should render border round based on prop", async () => {
  const page = await newSpecPage({
    components: [CorejamBox],
    html: `<corejam-box rounded="full">hallo</corejam-box>`,
  });
  const computedStyleRules = page.doc.head.querySelector("style[corejamstyle]").textContent;
  expect(computedStyleRules).toContain("border-radius: 9999px");
});

it("should render border round top based on prop", async () => {
  const page = await newSpecPage({
    components: [CorejamBox],
    html: `<corejam-box rounded-top="full">hallo</corejam-box>`,
  });
  const computedStyleRules = page.doc.head.querySelector("style[corejamstyle]").textContent;
  expect(computedStyleRules).toContain("border-top-right-radius: 9999px");
  expect(computedStyleRules).toContain("border-top-left-radius: 9999px");
});

it("should render border round right based on prop", async () => {
  const page = await newSpecPage({
    components: [CorejamBox],
    html: `<corejam-box rounded-right="full">hallo</corejam-box>`,
  });
  const computedStyleRules = page.doc.head.querySelector("style[corejamstyle]").textContent;
  expect(computedStyleRules).toContain("border-top-right-radius: 9999px");
  expect(computedStyleRules).toContain("border-bottom-right-radius: 9999px");
});

it("should render border round bottom based on prop", async () => {
  const page = await newSpecPage({
    components: [CorejamBox],
    html: `<corejam-box rounded-bottom="full">hallo</corejam-box>`,
  });
  const computedStyleRules = page.doc.head.querySelector("style[corejamstyle]").textContent;
  expect(computedStyleRules).toContain("border-bottom-right-radius: 9999px");
  expect(computedStyleRules).toContain("border-bottom-left-radius: 9999px");
});

it("should render border round left based on prop", async () => {
  const page = await newSpecPage({
    components: [CorejamBox],
    html: `<corejam-box rounded-left="full">hallo</corejam-box>`,
  });
  const computedStyleRules = page.doc.head.querySelector("style[corejamstyle]").textContent;
  expect(computedStyleRules).toContain("border-bottom-left-radius: 9999px");
});

it("should render border style based on prop", async () => {
  const page = await newSpecPage({
    components: [CorejamBox],
    html: `<corejam-box b-style="dashed">hallo</corejam-box>`,
  });
  const computedStyleRules = page.doc.head.querySelector("style[corejamstyle]").textContent;
  expect(computedStyleRules).toContain("border-style: dashed");
});

it("should render border width based on prop", async () => {
  const page = await newSpecPage({
    components: [CorejamBox],
    html: `<corejam-box b-width="8">hallo</corejam-box>`,
  });
  const computedStyleRules = page.doc.head.querySelector("style[corejamstyle]").textContent;
  expect(computedStyleRules).toContain("border-width: 8px");
});

it("should render dropshadow based on prop", async () => {
  const page = await newSpecPage({
    components: [CorejamBox],
    html: `<corejam-box shadow="0px 0px 10px rgba(0, 0, 0, 0.1)">hallo</corejam-box>`,
  });
  const computedStyleRules = page.doc.head.querySelector("style[corejamstyle]").textContent;
  expect(computedStyleRules).toContain("box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);");
});

it("should render position based on prop", async () => {
  const page = await newSpecPage({
    components: [CorejamBox],
    html: `<corejam-box position="static">hallo</corejam-box>`,
  });
  const computedStyleRules = page.doc.head.querySelector("style[corejamstyle]").textContent;
  expect(computedStyleRules).toContain("position: static;");
});

it("should render top left right bottom based on prop", async () => {
  const page = await newSpecPage({
    components: [CorejamBox],
    html: `<corejam-box top="20" left="10" right="30" bottom="40">hallo</corejam-box>`,
  });
  const computedStyleRules = page.doc.head.querySelector("style[corejamstyle]").textContent;
  expect(computedStyleRules).toContain("top: 20px;");
  expect(computedStyleRules).toContain("left: 10px;");
  expect(computedStyleRules).toContain("right: 30px;");
  expect(computedStyleRules).toContain("bottom: 40px;");
});

it("should render column count", async () => {
  const page = await newSpecPage({
    components: [CorejamBox],
    html: `<corejam-box column-count="2">hallo</corejam-box>`,
  });
  const computedStyleRules = page.doc.head.querySelector("style[corejamstyle]").textContent;
  expect(computedStyleRules).toContain("column-count: 2;");
});

it("should render reponsive column count", async () => {
  const page = await newSpecPage({
    components: [CorejamBox],
    html: `<corejam-box lg-column-count="4">hallo</corejam-box>`,
  });
  const computedStyleRules = page.doc.head.querySelector("style[corejamstyle]").textContent;
  expect(computedStyleRules).toContain("@media screen and (min-width: 1024px)");
  expect(computedStyleRules).toContain("column-count: 4;");
});
it("should render column fill", async () => {
  const page = await newSpecPage({
    components: [CorejamBox],
    html: `<corejam-box column-fill="balance">hallo</corejam-box>`,
  });
  const computedStyleRules = page.doc.head.querySelector("style[corejamstyle]").textContent;
  expect(computedStyleRules).toContain("column-fill: balance;");
});

it("should render reponsive column fill", async () => {
  const page = await newSpecPage({
    components: [CorejamBox],
    html: `<corejam-box lg-column-fill="balance">hallo</corejam-box>`,
  });
  const computedStyleRules = page.doc.head.querySelector("style[corejamstyle]").textContent;
  expect(computedStyleRules).toContain("@media screen and (min-width: 1024px)");
  expect(computedStyleRules).toContain("column-fill: balance;");
});

it("should render column color", async () => {
  const page = await newSpecPage({
    components: [CorejamBox],
    html: `<corejam-box column-rule-color="red">hallo</corejam-box>`,
  });
  const computedStyleRules = page.doc.head.querySelector("style[corejamstyle]").textContent;
  expect(computedStyleRules).toContain("column-rule-color: red;");
});

it("should render reponsive column rule color", async () => {
  const page = await newSpecPage({
    components: [CorejamBox],
    html: `<corejam-box lg-column-rule-color="red">hallo</corejam-box>`,
  });
  const computedStyleRules = page.doc.head.querySelector("style[corejamstyle]").textContent;
  expect(computedStyleRules).toContain("@media screen and (min-width: 1024px)");
  expect(computedStyleRules).toContain("column-rule-color: red;");
});

it("should render column rule style", async () => {
  const page = await newSpecPage({
    components: [CorejamBox],
    html: `<corejam-box column-rule-style="dashed">hallo</corejam-box>`,
  });
  const computedStyleRules = page.doc.head.querySelector("style[corejamstyle]").textContent;
  expect(computedStyleRules).toContain("column-rule-style: dashed;");
});

it("should render reponsive column rule style", async () => {
  const page = await newSpecPage({
    components: [CorejamBox],
    html: `<corejam-box lg-column-rule-style="dashed">hallo</corejam-box>`,
  });
  const computedStyleRules = page.doc.head.querySelector("style[corejamstyle]").textContent;
  expect(computedStyleRules).toContain("@media screen and (min-width: 1024px)");
  expect(computedStyleRules).toContain("column-rule-style: dashed;");
});

it("should render column rule wdith", async () => {
  const page = await newSpecPage({
    components: [CorejamBox],
    html: `<corejam-box column-rule-width="thick">hallo</corejam-box>`,
  });
  const computedStyleRules = page.doc.head.querySelector("style[corejamstyle]").textContent;
  expect(computedStyleRules).toContain("column-rule-width: thick;");
});

it("should render reponsive column rule width", async () => {
  const page = await newSpecPage({
    components: [CorejamBox],
    html: `<corejam-box lg-column-rule-width="thick">hallo</corejam-box>`,
  });
  const computedStyleRules = page.doc.head.querySelector("style[corejamstyle]").textContent;
  expect(computedStyleRules).toContain("@media screen and (min-width: 1024px)");
  expect(computedStyleRules).toContain("column-rule-width: thick;");
});

it("should render column span", async () => {
  const page = await newSpecPage({
    components: [CorejamBox],
    html: `<corejam-box column-span="all">hallo</corejam-box>`,
  });
  const computedStyleRules = page.doc.head.querySelector("style[corejamstyle]").textContent;
  expect(computedStyleRules).toContain("column-span: all;");
});

it("should render reponsive column span", async () => {
  const page = await newSpecPage({
    components: [CorejamBox],
    html: `<corejam-box lg-column-span="all">hallo</corejam-box>`,
  });
  const computedStyleRules = page.doc.head.querySelector("style[corejamstyle]").textContent;
  expect(computedStyleRules).toContain("@media screen and (min-width: 1024px)");
  expect(computedStyleRules).toContain("column-span: all;");
});
