import color from "./color";

it("white should be transformed", async () => {
  expect(color.transform("white")).toBe("var(--cj-colors-white)");
});

it("black should be transformed", async () => {
  expect(color.transform("black")).toBe("var(--cj-colors-black)");
});

it("custom var should be returned", async () => {
  expect(color.transform("--cj-primary")).toBe("var(--cj-primary)");
});

it("should return base shade", async () => {
  expect(color.transform("green")).toBe("var(--cj-colors-green-500)");
});

it("should return shade", async () => {
  expect(color.transform("green-700")).toBe("var(--cj-colors-green-700)");
});
