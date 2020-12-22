import Notify from "../Notify";
import { MergedServerContext } from "../types/PluginResolver";
import MailTransport from "./mail/Transporter";

let mailTransport: MailTransport;

if (process.env.MAIL_TRANSPORT === MailTransport.TRANSPORT.AWS_SES) {
  const SES = require("./mail/SES").default
  mailTransport = new SES();
}

/**
 * Anything that this plugin offers to the server context is retrieved here
 */
export function getPluginContext({ models }): MergedServerContext {
  return { models, notify: new Notify(mailTransport) };
}