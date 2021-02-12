import { normalizePropertyBasedOnPossibleIdentifiers } from "../style";

describe("normalize property", () => {
  it("should normalize base property", () => {
    const normalizedProp = normalizePropertyBasedOnPossibleIdentifiers("bWidthRight");
    expect(normalizedProp).toBe("bWidthRight");
  });

  it("should normalize with one pseudo identifier", () => {
    const normalizedProp = normalizePropertyBasedOnPossibleIdentifiers("hoverBg");
    expect(normalizedProp).toBe("bg");
  });

  it("should normalize with two pseudo identifiers", () => {
    const normalizedProp = normalizePropertyBasedOnPossibleIdentifiers("mdHoverBg");
    expect(normalizedProp).toBe("bg");
  });
});
