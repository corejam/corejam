import { OutgoingMessage } from "http";

/**
 * Currently only a proxy class incase we are inside
 * a lambda function and need to parse headers.
 *
 * Otherwise it just calls super.setHeader and this can be ignored
 */
export default class Response extends OutgoingMessage {
  private context:
    | {
        headers: { name: string; value: number | string | ReadonlyArray<string> }[];
      }
    | undefined;

  /**
   * Assign the GraphQL Context so we can use it later on
   * @param context
   */
  constructor(context: any) {
    super();

    if (process.env.AWS_EXECUTION_ENV && process.env.AWS_EXECUTION_ENV.includes("AWS_Lambda_")) {
      this.context = {
        ...context,
        headers: [],
      };
    }
  }

  /**
   * If we are inside a lambda we want to "abuse" the context object
   * to write headers in so we can later parse them back out to the lambda event
   * structure
   *
   * @param name
   * @param value
   */
  setHeader(name: string, value: number | string | ReadonlyArray<string>): void {
    super.setHeader(name, value);

    if (this.context) {
      this.context.headers.push({ name, value });
    }
  }
}
