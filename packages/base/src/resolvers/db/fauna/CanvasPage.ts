import { updateDates } from "../../../Functions";
import { query as q } from "faunadb";
import type { CanvasPage, CanvasPageDB, CanvasPeer, CanvasPeers } from "../../../typings/Canvas";
import { FaunaClient } from "./Client";

export function canvasPageByUrl(slug: string): Promise<CanvasPageDB | null> {
  return FaunaClient()
    .query(q.Get(q.Match(q.Index("seo"), slug)))
    .then((response: any) => {
      return {
        id: response.ref.id,
        ...response.data,
      };
    });
}

export function allCanvasPages(): Promise<CanvasPageDB[]> {
  return FaunaClient()
    .query(
      q.Map(
        q.Paginate(q.Match(q.Index("allCanvasPages"))),
        q.Lambda("x", q.Merge({ id: q.Select(["ref", "id"], q.Get(q.Var("x"))) }, q.Select("data", q.Get(q.Var("x")))))
      )
    )
    .then((response: any) => {
      return response.data;
    });
}

export function canvasPageCreate(canvasPageInput: CanvasPage): Promise<CanvasPageDB> {
  return FaunaClient()
    .query(
      q.Create(q.Collection("canvasPages"), {
        data: {
          ...canvasPageInput,
          ...updateDates(),
        },
      })
    )
    .then((response: any) => {
      return {
        id: response.ref.id,
        ...response.data,
      };
    });
}

export function canvasPageEdit(id: string, canvasPageInput: CanvasPage): Promise<CanvasPageDB> {
  return FaunaClient()
    .query(
      q.Update(q.Ref(q.Collection("canvasPages"), id), {
        data: canvasPageInput,
      })
    )
    .then((response: any) => {
      return response.data;
    });
}

export function canvasPageById(id: string): Promise<CanvasPageDB | null> {
  return FaunaClient()
    .query(q.Get(q.Ref(q.Collection("canvasPages"), id)))
    .then((response: any) => {
      return {
        id: response.ref.id,
        ...response.data,
      };
    });
}

export async function canvasOpenPeers(id: string, peerInput: CanvasPeer): Promise<CanvasPeers> {
  const canvas = (await canvasPageById(id)) as CanvasPageDB;

  if (!canvas.peers) {
    canvas.peers = {
      key: "test",
      peers: [] as CanvasPeer[],
    };
  }

  canvas.peers.peers.push({ ...peerInput });
  const editResult = await canvasPageEdit(id, { ...canvas });

  return new Promise((res) => res(editResult.peers));
}

export async function canvasPollPeers(id: string): Promise<CanvasPeers> {
  const canvas = await canvasPageById(id);
  return new Promise((res) => res(canvas?.peers));
}

export async function canvasClosePeers(id: string): Promise<CanvasPage> {
  const canvas = await canvasPageById(id);
  delete canvas?.peers;
  return FaunaClient()
    .query(
      q.Replace(q.Ref(q.Collection("canvasPages"), id), {
        data: { ...canvas },
      })
    )
    .then((response: any) => {
      return response.data;
    });
}
