import Notify from "../Notify";
import { MergedServerContext } from "../types/PluginResolver";
import MailTransport from "./mail/Transporter";

let mailTransport: MailTransport;

/**
 * If no env is set we automatically go to EmptyMailTransport 
 * to display console warnings
 */
if (process.env.MAIL_TRANSPORT === MailTransport.TRANSPORT.AWS_SES) {
  const SES = require("./mail/SES").default
  mailTransport = new SES();
} else if (process.env.MAIL_TRANSPORT === MailTransport.TRANSPORT.SMTP) {
  const SMTP = require("./mail/SMTP").default
  mailTransport = new SMTP();
}

/**
 * Anything that this plugin offers to the server context is retrieved here
 */
export function getPluginContext({ models }): MergedServerContext {
  return { models, notify: new Notify(mailTransport) };
}