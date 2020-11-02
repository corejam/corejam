import execa from "execa";

let isMono = true;

function monoCheck() {
  try {
    execa.sync("yarn", ["workspaces", "info"]);
  } catch (e) {
    isMono = false;
  }
}
monoCheck();

export const envRoot = isMono ? process.cwd() : (process.env.INIT_CWD as string);
export const mono = isMono;
