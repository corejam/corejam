import clip from "./clip";

it("should transform clip value", async () => {
  expect(clip.transform("border")).toBe("border-box");
});

it("should transform clip value", async () => {
  expect(clip.transform("text")).toBe("text");
});

it("should throw error", async () => {
  expect(() => clip.transform("wrong")).toThrowError();
});
