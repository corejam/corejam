import execa from "execa";
import { envRoot } from "../config";

export async function runWCTests() {
  await execa("stencil", ["test", "--spec"], { stdio: "inherit", cwd: envRoot });
}
