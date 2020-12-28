/**
 * Default Corejam Email class
 */
export default abstract class Mail {

    public readonly to: string | string[];
    public readonly bcc: string[];
    public readonly cc: string[];
    public readonly subject: string;

    constructor(
        to: string[] | string,
        subject: string,
        cc: string[] = [],
        bcc: string[] = []) {

        this.subject = subject;
        this.to = to;
        this.bcc = bcc;
        this.cc = cc;
    }

    /**
     * This should return your templated body
     */
    abstract getBody(): string
}