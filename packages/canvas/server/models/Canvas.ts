import { SEO } from "@corejam/base/dist/typings/Seo";
import { CoreModel } from "@corejam/base/src/db/CoreModel";
import { Corejam } from "@corejam/base/src/db/ModelDecorator";

/*
TODO enable peers again
export type CanvasPeer = {
    hash: string;
    offer: object;
};

export type CanvasPeers = {
    key: string;
    peers: CanvasPeer[];
}; */

export class Canvas extends CoreModel {
  collection: string = "canvas";

  @Corejam()
  canvas: string = "";

  @Corejam()
  seo: SEO;

  /**
    @Corejam()
    peers?: CanvasPeers
    */
}
