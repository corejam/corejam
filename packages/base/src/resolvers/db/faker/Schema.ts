import { bootstrapSchema } from "../../../Bootstrap";

export async function schema(): Promise<any> {
  const schema = await bootstrapSchema();
  return new Promise((res) => res(schema));
}
