import * as nodemailer from "nodemailer";
import Mail from "../../Mail";
import Transporter from "./Transporter";


/**
 * SMTP Mail sending
 */
export default class SMTP extends Transporter {

    private client;

    constructor(client = nodemailer.createTransport({
        host: process.env.MAIL_SMTP_HOST as string,
        port: process.env.MAIL_SMTP_PORT as string,
        secure: process.env.MAIL_SMTP_PORT == "465" ? true : false,
        auth: {
            user: process.env.MAIL_SMTP_USER as string,
            pass: process.env.MAIL_SMTP_PASS as string
        },
    })) {
        super();
        this.client = client;
    }

    send(mail: Mail): void {
        return this.client.sendMail({
            from: process.env.MAIL_SENDER_EMAIL,
            to: Array.isArray(mail.to) ? mail.to.join() : mail.to,
            html: mail.getBody(),
            subject: mail.subject
        })
    }
}