/**
 * Amazon SES Mail client
 */
import Mail from "../../Mail";
import Transporter from "./Transporter";
import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses"

/**
 * Amazon SES mail transporter
 */
export default class SES extends Transporter {

    private client: SESClient;

    constructor(client = new SESClient({
        credentials: {
            accessKeyId: process.env.SES_ACCESS_KEY_ID as string,
            secretAccessKey: process.env.SES_SECRET_ACCESS_KEY as string
        }
    })) {
        super()
        this.client = client;
    }

    send(mail: Mail): void {
        this.client.send(new SendEmailCommand({
            Message: {
                Body: {
                    Html: {
                        Data: mail.body
                    },
                },
                Subject: {
                    Data: mail.subject
                }
            },
            Source: process.env.NOTIFY_SENDER_EMAIL,
            Destination: {
                BccAddresses: mail.bcc,
                CcAddresses: mail.cc,
                ToAddresses: Array.isArray(mail.to) ? mail.to : [mail.to]
            }
        }))
    }
}