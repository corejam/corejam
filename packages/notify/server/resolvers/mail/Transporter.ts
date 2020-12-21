import Mail from "../../Mail";

enum Transport {
    AWS_SES = "AWS_SES",
}

/**
 * Mail transport class
 * 
 * If you implement your own service you need to implement this.
 */
export default abstract class MailTransport {

    static readonly TRANSPORT = Transport;

    abstract send(mail: Mail): void
}

/**
 * See https://github.com/corejam/corejam/tree/next/packages/notify/README.md
 */
export class EmptyMailTransport extends MailTransport {

    send(_mail: Mail): void {
        console.error("Mail Transport not configured!")
    }
}