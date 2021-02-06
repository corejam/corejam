import { updateDates } from "@corejam/base";
import { FaunaClient } from "@corejam/base/dist/resolvers/db/fauna/Client";
import type { SEOInput } from "@corejam/base/dist/typings/Seo";
import { query as q } from "faunadb";
import type {
  ManufacturerCreateInput,
  ManufacturerDB,
  ManufacturerEditInput,
} from "../../../../shared/types/Manufacturer";

export function allManufacturers(): Promise<ManufacturerDB[]> {
  return FaunaClient()
    .query(
      q.Map(
        q.Paginate(q.Match(q.Index("allManufacturers"))),
        q.Lambda("x", q.Merge({ id: q.Select(["ref", "id"], q.Get(q.Var("x"))) }, q.Select("data", q.Get(q.Var("x")))))
      )
    )
    .then((response: any) => {
      return response.data;
    });
}

export function manufacturerCreate(manufacturerInput: ManufacturerCreateInput): Promise<ManufacturerDB> {
  return FaunaClient()
    .query(
      q.Create(q.Collection("manufacturers"), {
        data: {
          ...manufacturerInput,
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

export function manufacturerByID(id: string): Promise<ManufacturerDB | null> {
  return FaunaClient()
    .query(q.Get(q.Ref(q.Collection("manufacturers"), id)))
    .then((response: any) => {
      return {
        id: response.ref.id,
        ...response.data,
      };
    });
}

export function manufacturerByUrl(slug: string): Promise<ManufacturerDB | null> {
  return FaunaClient()
    .query(q.Get(q.Match(q.Index("seoSearch"), slug)))
    .then((response: any) => {
      return manufacturerByID(response.ref.id);
    });
}

export function manufacturerEdit(id: string, manufacturerInput: ManufacturerEditInput): Promise<ManufacturerDB> {
  return FaunaClient()
    .query(
      q.Update(q.Ref(q.Collection("manufacturers"), id), {
        data: {
          ...manufacturerInput,
        },
      })
    )
    .then((response: any) => {
      return response.data;
    });
}

export function manufacturersForSelect(): Promise<ManufacturerDB[]> {
  return allManufacturers().then((response) => response);
}

export function manufacturerEditSEO(id: string, seoInput: SEOInput): Promise<ManufacturerDB> {
  return manufacturerEdit(id, { seo: seoInput });
}
