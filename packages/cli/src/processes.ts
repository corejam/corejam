import { ChildProcess } from "child_process";

let spawendProcesses: null | Map<string, ChildProcess> = null;

export function set(key: string, process: ChildProcess) {
  if (!spawendProcesses) spawendProcesses = new Map();

  if (spawendProcesses.has(key)) throw new Error("Process already defined");

  spawendProcesses.set(key, process);
}

export function get(key: string) {
  if (spawendProcesses) {
    if (!spawendProcesses.has(key)) throw new Error("Process already defined");
    return spawendProcesses.get(key);
  }
  throw new Error("No processes defined");
}

export function kill(key: string) {
  try {
    const process = get(key);
    process?.kill("SIGINT");
    spawendProcesses?.delete(key);
  } catch (e) {
    throw new Error(e);
  }
}

export function killAll() {
  if (spawendProcesses) {
    spawendProcesses.forEach((p) => {
      p.kill("SIGINT");
    });
    spawendProcesses.clear();
  }
}
