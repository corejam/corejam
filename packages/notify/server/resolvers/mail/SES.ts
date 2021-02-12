/**
 * Amazon SES Mail client
 */
import { SendEmailCommand, SESClient } from "@aws-sdk/client-ses";
import Mail from "../../Mail";
import Transporter from "./Transporter";

/**
 * Amazon SES mail transporter
 */
export default class SES extends Transporter {
  private client: SESClient;

  constructor(
    client = new SESClient({
      credentials: {
        accessKeyId: process.env.MAIL_SES_ACCESS_KEY_ID as string,
        secretAccessKey: process.env.MAIL_SES_SECRET_ACCESS_KEY as string,
      },
      region: process.env.MAIL_SES_REGION as string,
    })
  ) {
    super();
    this.client = client;
  }

  send(mail: Mail): void {
    this.client.send(
      new SendEmailCommand({
        Message: {
          Body: {
            Html: {
              Data: mail.getBody(),
            },
          },
          Subject: {
            Data: mail.subject,
          },
        },
        Source: process.env.MAIL_SENDER_EMAIL,
        Destination: {
          BccAddresses: mail.bcc,
          CcAddresses: mail.cc,
          ToAddresses: Array.isArray(mail.to) ? mail.to : [mail.to],
        },
      })
    );
  }
}
