import { generateSeo } from "@corejam/base/dist/resolvers/db/faker/Generator";
import { random } from "faker";
import type { CanvasPage, CanvasPageDB, CanvasPeer, CanvasPeers } from "../../../../shared/types/Canvas";
import { generateCanvasPage } from "./Generator";
export let canvasPages = [] as CanvasPageDB[];
import * as fs from "fs"

canvasPages.push({
  id: "static-canvas",
  seo: generateSeo({
    url: "canvas",
  }),
  canvas: `
  <html>
    <corejam-box>
      <corejam-type weight="bold">
        Static canvas test
      <corejam-type>
    </corejam-box>
  </html>`,
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

/**
 * When we are in faker mode we store in memory and also directly 
 * write out to the www/build/config.json so the client can visit the 
 * new page directly.
 * 
 * @param canvasPageInput 
 */
export function canvasPageCreate(canvasPageInput: CanvasPage): Promise<CanvasPageDB> {
  const model = {
    id: canvasPageInput.seo.url,
    ...canvasPageInput,
  };
  canvasPages.push(model);

  const configPath = process.cwd() + "/www/build/config.json";

  /**
   * Check are we inside corejam process
   * next.js does not have www/ folder
   */
  if (fs.existsSync(configPath)) {
    const config = require(configPath);
    config.router.routes.push({
      url: `/${canvasPageInput.seo?.url}`,
      exact: true,
      canvasPage: true,
      component: canvasPageInput.canvas
    })
    fs.writeFileSync(configPath, JSON.stringify(config))
  }

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
