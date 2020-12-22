import { CorejamServer, getServerContext } from "@corejam/base/dist/Server"
import SES from "../server/resolvers/mail/SES";
import Mail from "../server/Mail";
import Notify from "../server/Notify";
import { MergedServerContext } from "../server/types/PluginResolver"
import * as OriginalSES from "@aws-sdk/client-ses"
import MailTransport from "../server/resolvers/mail/Transporter";

/**
 * Need to do some bending to get typescript to mock classes
 * https://stackoverflow.com/a/53524697
 */
jest.mock("@aws-sdk/client-ses")
const MockedSES = OriginalSES as jest.Mocked<typeof OriginalSES>
const SESClient = new MockedSES.SESClient({});

describe("Mail Transporter", () => {

  beforeEach(() => {
    jest.resetModules();
  });

  it("Make sure notify context has been registered & default error", async () => {
    const server = CorejamServer();
    const context = server.context({ req: {}, res: {} }) as MergedServerContext

    expect(context).toHaveProperty("notify")

    //We need to reimport due to the jest resetModules clearing instances
    const notifyClass = require("../server/Notify").default
    expect(context.notify).toBeInstanceOf(notifyClass)

    const emptyTransportClass = require("../server/resolvers/mail/Transporter").EmptyMailTransport
    expect(context.notify.mailTransport).toBeInstanceOf(emptyTransportClass)

    const testMail = new Mail("test@test.com", "Test Subject", "Test Body")
    console.error = jest.fn()
    context.notify.sendMail(testMail)
    expect(console.error).toHaveBeenCalledWith("Mail Transport not configured!")
  });

  it("Test SES transportinstance initiated over env", async () => {
    process.env.MAIL_TRANSPORT = MailTransport.TRANSPORT.AWS_SES
    delete require.cache[process.cwd() + "/server/index.ts"]

    const server = CorejamServer(() => getServerContext({ req: {}, res: {} }));
    const context = server.context(getServerContext({ req: {}, res: {} })) as MergedServerContext

    expect(context).toHaveProperty("notify")
    const sesClass = require("../server/resolvers/mail/SES").default
    expect(context.notify.mailTransport).toBeInstanceOf(sesClass)

    delete process.env.MAIL_TRANSPORT //clean up
  });

  it("Test SES Send is called when using transporter send", async () => {
    const testMail = new Mail("test@test.com", "Test Subject", "Test Body")

    const sesTransport = new SES(SESClient);
    new Notify(sesTransport).sendMail(testMail);
    expect(SESClient.send).toBeCalled()

    const testMailMultipleTo = new Mail(["test@test.com", "test2@test.com"], "Test Subject", "Test Body")

    new Notify(sesTransport).sendMail(testMailMultipleTo);
    expect(SESClient.send).toBeCalled()

  });
});