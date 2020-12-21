import { CorejamServer } from "@corejam/base/dist/Server"
import Mail from "../server/Mail";
import { MergedServerContext } from "../server/types/PluginResolver"

describe("Email Tests", () => {
  it("Make sure notify cotext has been registered & default error", async () => {
    const server = CorejamServer();
    const context = server.context({ req: {}, res: {} }) as MergedServerContext

    expect(context).toHaveProperty("notify")

    const testMail = new Mail("test@test.com", "Test Subject", "Test Body")
    console.error = jest.fn()
    context.notify.sendMail(testMail)
    expect(console.error).toHaveBeenCalledWith("Mail Transport not configured!")
  });
});