import Mail from "./Mail";
import MailTransport, { EmptyMailTransport } from "./resolvers/mail/Transporter";

/**
 * Main handler for anything notifcation related throughout Corejam
 * applications
 */
export default class Notify {
  public readonly mailTransport: MailTransport;

  constructor(mailTrainsport: MailTransport = new EmptyMailTransport()) {
    this.mailTransport = mailTrainsport;
  }

  /**
   * Send mail based on mail transport defined above
   */
  sendMail(mail: Mail): Promise<any> {
    return this.mailTransport.send(mail);
  }

  /*
    sendSMS() {
        //TODO implement
    }

    pushNotification() {
        //TODO implement
    }
    */
}
