import { CorejamServer, getServerContext } from "@corejam/base/dist/Server";
import SES from "../server/resolvers/mail/SES";
import Mail from "../server/Mail";
import Notify from "../server/Notify";
import { MergedServerContext } from "../server/types/PluginResolver";
import * as OriginalSES from "@aws-sdk/client-ses";
import MailTransport from "../server/resolvers/mail/Transporter";
import SMTP from "../server/resolvers/mail/SMTP";
// const fetch = require("node-fetch");

/**
 * Need to do some bending to get typescript to mock classes
 * https://stackoverflow.com/a/53524697
 */
jest.mock("@aws-sdk/client-ses");
const MockedSES = OriginalSES as jest.Mocked<typeof OriginalSES>;
const SESClient = new MockedSES.SESClient({});

describe("Mail Transporter Integration tests", () => {
  beforeEach(() => {
    jest.resetModules();
  });

  it("Make sure notify context has been registered & default error", async () => {
    const server = CorejamServer();
    const context = server.context({ req: {}, res: {} }) as MergedServerContext;

    expect(context).toHaveProperty("notify");

    //We need to reimport due to the jest resetModules clearing instances
    const notifyClass = require("../server/Notify").default;
    expect(context.notify).toBeInstanceOf(notifyClass);

    const emptyTransportClass = require("../server/resolvers/mail/Transporter").EmptyMailTransport;
    expect(context.notify.mailTransport).toBeInstanceOf(emptyTransportClass);

    const testMail = new TestMail("test@test.com", "Test Subject");
    console.error = jest.fn();
    context.notify.sendMail(testMail);
    expect(console.error).toHaveBeenCalledWith("Mail Transport not configured!");
  });

  it("Test SES transportinstance initiated over env", async () => {
    process.env.MAIL_TRANSPORT = MailTransport.TRANSPORT.AWS_SES;
    delete require.cache[process.cwd() + "/server/index.ts"];

    const server = CorejamServer(() => getServerContext({ req: {}, res: {} }));
    const context = server.context(getServerContext({ req: {}, res: {} })) as MergedServerContext;

    expect(context).toHaveProperty("notify");
    const sesClass = require("../server/resolvers/mail/SES").default;
    expect(context.notify.mailTransport).toBeInstanceOf(sesClass);

    delete process.env.MAIL_TRANSPORT; //clean up
  });

  it("Test SMTP transportinstance initiated over env", async () => {
    process.env.MAIL_TRANSPORT = MailTransport.TRANSPORT.SMTP;
    delete require.cache[process.cwd() + "/server/index.ts"];

    const server = CorejamServer(() => getServerContext({ req: {}, res: {} }));
    const context = server.context(getServerContext({ req: {}, res: {} })) as MergedServerContext;

    expect(context).toHaveProperty("notify");
    const smtpClass = require("../server/resolvers/mail/SMTP").default;
    expect(context.notify.mailTransport).toBeInstanceOf(smtpClass);

    delete process.env.MAIL_TRANSPORT; //clean up
  });

  it("Test SES Send is called when using transporter send", async () => {
    const testMail = new TestMail("test@test.com", "Test Subject");

    const sesTransport = new SES(SESClient);
    new Notify(sesTransport).sendMail(testMail);
    expect(SESClient.send).toBeCalled();

    const testMailMultipleTo = new TestMail(["test@test.com", "test2@test.com"], "Test Subject");

    new Notify(sesTransport).sendMail(testMailMultipleTo);
    expect(SESClient.send).toBeCalled();
  });

  /**
   * This needs to run before nodemailer Send below due to mock not being reset
   */
  // it("Integration test SMTP over ethereal.email", async () => {
  //   const testMail = new TestMail("test@test.com", "Test Subject")
  //   const nodemailer = require("nodemailer")
  //   const account = await nodemailer.createTestAccount()

  //   // create reusable transporter object using the default SMTP transport
  //   const initTransport = nodemailer.createTransport({
  //     host: 'smtp.ethereal.email',
  //     port: 587,
  //     secure: false, // true for 465, false for other ports
  //     auth: {
  //       user: account.user, // generated ethereal user
  //       pass: account.pass  // generated ethereal password
  //     }
  //   });

  //   const info = await new Notify(new SMTP(initTransport)).sendMail(testMail) as unknown as Promise<any>;
  //   const message = nodemailer.getTestMessageUrl(info)
  //   console.info("Email url", message)

  //   const test = await fetch(message + "/message.eml", {
  //     method: "GET",
  //   })

  //   const response = await test.text()
  //   expect(response).toContain("test@test.com")
  //   expect(response).toContain("Subject: Test Subject")
  // });

  it("Test nodemailer Send is called when using SMTP transporter", async () => {
    const testMail = new TestMail("test@test.com", "Test Subject");

    jest.mock("nodemailer");
    const nodemailer = require("nodemailer");
    nodemailer.createTransport.mockReturnValue({ sendMail: jest.fn() });
    const nodemailerMock = nodemailer.createTransport();
    const sendMock = jest.spyOn(nodemailerMock, "sendMail");

    const smtpTransport = new SMTP(nodemailerMock);
    new Notify(smtpTransport).sendMail(testMail);
    expect(sendMock).toBeCalled();

    const testMailMultipleTo = new TestMail(["test@test.com", "test2@test.com"], "Test Subject");

    new Notify(smtpTransport).sendMail(testMailMultipleTo);
    expect(sendMock).toBeCalled();
  });
});

class TestMail extends Mail {
  getBody(): string {
    return "Test Subject";
  }
}
