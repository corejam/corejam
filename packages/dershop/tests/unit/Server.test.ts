import { getServerContext } from "@corejam/base/src/Server";

describe("Bootstrap", () => {
  it("serverContextWasMerged", async () => {
    const context = await getServerContext({ req: {}, res: {} });

    expect(context).toHaveProperty("models");
    expect(context).toHaveProperty("user");
    expect(context).toHaveProperty("eventEmitter");

    //TODO more assertions based on context
  });
});
