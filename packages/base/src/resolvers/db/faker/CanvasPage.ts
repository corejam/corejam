import { random } from "faker";
import type { CanvasPage, CanvasPageDB, CanvasPeer, CanvasPeers } from "../../../typings/Canvas";
import { generateCanvasPage, generateSeo } from "./Generator";

export let canvasPages = [] as CanvasPageDB[];

canvasPages.push({
  id: "static-canvas",
  seo: generateSeo({
    url: "canvas",
  }),
  canvas: {
    name: "/",
    date: 1588764707637,
    items: [],
  },
} as CanvasPageDB);

if (canvasPages.length === 0) {
  for (let index = 0; index < 5; index++) {
    const generated = generateCanvasPage({});

    canvasPages.push({
      id: random.uuid(),
      ...generated,
    } as CanvasPageDB);
  }
}

export function canvasPageByUrl(slug: string): Promise<CanvasPageDB | null> {
  const canvasPage = canvasPages.filter((canvasPage) => {
    if (canvasPage.seo?.url == slug) {
      return canvasPage;
    }
    return;
  })[0];

  return new Promise((res) => res(canvasPage));
}

export function allCanvasPages(): Promise<CanvasPageDB[]> {
  return new Promise((res) => res(canvasPages));
}

export function canvasPageCreate(canvasPageInput: CanvasPage): Promise<CanvasPageDB> {
  const model = {
    id: random.uuid(),
    ...canvasPageInput,
  };
  canvasPages.push(model);

  return new Promise((res) => res(model));
}

export function canvasPageEdit(id: string, canvasPageInput: CanvasPage): Promise<CanvasPageDB> {
  let canvasPage = canvasPages.filter((canvasPage: CanvasPageDB) => {
    return canvasPage.id === id;
  })[0];

  canvasPage = { ...canvasPage, ...canvasPageInput };
  canvasPages = canvasPages.map((canvasPageOld: CanvasPageDB) => {
    if (canvasPage.id === id) {
      return canvasPage;
    }
    return canvasPageOld;
  });

  return new Promise((res) => res(canvasPage));
}

export function canvasPageById(id: string): Promise<CanvasPageDB | null> {
  return new Promise((res) => res(canvasPages.filter((canvasPage: CanvasPageDB) => canvasPage.id === id)[0]));
}

export function canvasOpenPeers(id: string, peerInput: CanvasPeer): Promise<CanvasPeers> {
  let canvasPage = canvasPages.filter((canvasPage: CanvasPageDB) => {
    return canvasPage.id === id;
  })[0];

  const peers: CanvasPeers = {
    key: "test",
    peers: [] as CanvasPeer[],
  };
  if (!canvasPage.peers) {
    canvasPage.peers = peers;
  }

  canvasPage.peers.peers.push({
    hash: peerInput.hash,
    offer: peerInput.offer,
  });

  canvasPage = { ...canvasPage };

  canvasPages = canvasPages.map((canvasPageOld: CanvasPageDB) => {
    if (canvasPage.id === id) {
      return canvasPage;
    }
    return canvasPageOld;
  });

  return new Promise((res) => res(peers));
}

export function canvasClosePeers(id: string): Promise<CanvasPage> {
  let canvasPage = canvasPages.filter((canvasPage: CanvasPageDB) => {
    return canvasPage.id === id;
  })[0];

  delete canvasPage.peers;
  canvasPage = { ...canvasPage };

  canvasPages = canvasPages.map((canvasPageOld: CanvasPageDB) => {
    if (canvasPage.id === id) {
      return canvasPage;
    }
    return canvasPageOld;
  });

  return new Promise((res) => res(canvasPage));
}

export function canvasPollPeers(id: string): Promise<CanvasPeers | null> {
  const canvasPage = canvasPages.filter((canvasPage: CanvasPageDB) => {
    return canvasPage.id === id;
  })[0];

  return new Promise((res) => res(canvasPage.peers ?? null));
}
