import type { P2p, P2pCreateInput } from "../../../types/p2p";

const p2p = [] as P2p[];

export async function getAllP2p(): Promise<P2p[]> {
  return new Promise((res) => res(p2p));
}

export function p2pCreate(p2pCreateInput: P2pCreateInput): Promise<P2p> {
  //@ts-ignore
  p2p.push(p2pCreateInput.p2pCreateInput);

  //@ts-ignore
  return new Promise((res) => res(p2pCreateInput.p2pCreateInput));
}
