import { updateDates } from "@corejam/base";
import { FaunaClient } from "@corejam/base/dist/resolvers/db/fauna/Client";
import { query as q } from "faunadb";
import type { Category, CategoryCreateInput, CategoryDB } from "../../../../shared/types/Category";

export function allCategories(): Promise<CategoryDB[]> {
  return FaunaClient()
    .query(
      q.Map(
        q.Paginate(q.Match(q.Index("allCategories"))),
        q.Lambda("x", q.Merge({ id: q.Select(["ref", "id"], q.Get(q.Var("x"))) }, q.Select("data", q.Get(q.Var("x")))))
      )
    )
    .then((response: any) => {
      return response.data;
    });
}

export function categoryById(id: string): Promise<CategoryDB | null> {
  return FaunaClient()
    .query(q.Get(q.Ref(q.Collection("categories"), id)))
    .then((response: any) => {
      return {
        id: response.ref.id,
        ...response.data,
      };
    });
}

export function categoryCreate(categoryInput: Category): Promise<CategoryDB> {
  return FaunaClient()
    .query(
      q.Create(q.Collection("categories"), {
        data: {
          ...categoryInput,
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

export function categoryEdit(id: string, categoryInput: CategoryCreateInput): Promise<CategoryDB> {
  return FaunaClient()
    .query(
      q.Update(q.Ref(q.Collection("categories"), id), {
        data: {
          ...categoryInput,
          ...updateDates(categoryInput),
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

export function categoryByUrl(_slug: string): Promise<CategoryDB | null> {
  return new Promise((res) => res({} as CategoryDB));
}
