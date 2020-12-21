/**
 * Default Corejam Email class
 */
export default class Mail {

    public readonly to: string[]
    public readonly bcc: string[]
    public readonly cc: string[]
    public readonly subject: string;
    public readonly body: string;

    constructor(subject: string, body: string, to: string[], cc: string[], bcc: string[]) {
        if (!to.length) {
            throw new Error("Missing recipient to")
        }

        this.subject = subject;
        this.body = body;
        this.to = to;
        this.bcc = bcc;
        this.cc = cc;
    }

}