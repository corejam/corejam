/**
 * Default Corejam Email class
 */
export default class Mail {

    public readonly to: string | string[]
    public readonly bcc: string[];
    public readonly cc: string[];
    public readonly subject: string;
    public readonly body: string;

    constructor(
        to: string[] | string,
        subject: string,
        body: string,
        cc: string[] = [],
        bcc: string[] = []) {

        this.subject = subject;
        this.body = body;
        this.to = to;
        this.bcc = bcc;
        this.cc = cc;
    }

}