import { updateDates } from "@corejam/base";
import { FaunaClient } from "@corejam/base/dist/resolvers/db/fauna/Client";
import type { Image, ImageInput } from "@corejam/base/dist/typings/Image";
import type { SEOInput } from "@corejam/base/dist/typings/Seo";
import type { Deliverability } from "@corejam/base/dist/typings/Utils";
import { query as q } from "faunadb";
import { LinkResult } from "../../../../shared/types/PluginResolver";
import type { PriceInput } from "../../../../shared/types/Price";
import type { ProductCoreInput, ProductDB, ProductEditInput } from "../../../../shared/types/Product";

export function allProducts(): Promise<ProductDB[]> {
  return FaunaClient()
    .query(
      q.Map(
        q.Paginate(q.Match(q.Index("allProducts"))),
        q.Lambda("x", q.Merge(q.Select("data", q.Get(q.Var("x"))),
          {
            id: q.Select(["ref", "id"], q.Get(q.Var("x"))),
            categories: q.If(q.IsArray(q.Select(["data", "categories"], q.Get(q.Var("x")), false)),
              q.Map(
                q.Select(["data", "categories"], q.Get(q.Var("x"))),
                q.Lambda("category", q.Merge(q.Select(["data"], q.Get(q.Var("category"))), {
                  id: q.Select(["ref", "id"], q.Get(q.Var("category")))
                }))),
              null),
            manufacturer: q.If(q.ContainsField("manufacturer", q.Select("data", q.Get(q.Var("x")))),
              q.Select(["data"], q.Get(q.Select(["data", "manufacturer", "data"], q.Get(q.Var("x")))))
              , null)
          }))
      )
    )
    .then((response: any) => {
      return response.data;
    });
}

export function productByID(id: string): Promise<ProductDB | null> {
  return FaunaClient()
    .query(
      q.Merge(
        {
          product: q.Select(["data"], q.Get(q.Ref(q.Collection("products"), id))),
          categories: q.If(q.IsArray(q.Select(["data", "categories"], q.Get(q.Ref(q.Collection("products"), id)), false)), q.Map(
            q.Select(["data", "categories"], q.Get(q.Ref(q.Collection("products"), id))),
            q.Lambda(["ref"], q.Get(q.Var("ref")))), null
          )
        },
        {
          manufacturer: q.If(q.IsObject(q.Select(["data", "manufacturer"], q.Get(q.Ref(q.Collection("products"), id)), false)), {
            id: q.Select(
              ["ref", "id"],
              q.Get(
                q.Ref(
                  q.Collection("manufacturers"),
                  q.Select(
                    ["data", "manufacturer", "data", "id"],
                    q.Get(q.Ref(q.Collection("products"), id))
                  )
                )
              )
            ),
            data: q.Select(
              ["data"],
              q.Get(
                q.Ref(
                  q.Collection("manufacturers"),
                  q.Select(
                    ["data", "manufacturer", "data", "id"],
                    q.Get(q.Ref(q.Collection("products"), id))
                  )
                )
              )
            )
          }, null)
        }
      )
    )
    .then((response: any) => {
      const product = {
        id,
        ...{
          ...response.product
        },
      };

      if (response.categories) {
        product.categories = response.categories.map((categoryRef) => {
          return {
            id: categoryRef.ref.id,
            ...categoryRef.data
          }
        });
      }

      if (response.product.manufacturer) {
        product.manufacturer = {
          ...response.product.manufacturer,
          ...{
            data: {
              id: response.product.manufacturer.id,
              ...response.manufacturer.data,
            }
          },
        }
      }

      return product;
    });
}

export function productByUrl(slug: string): Promise<ProductDB | null> {
  return FaunaClient()
    .query(q.Get(q.Match(q.Index("seoSearch"), slug)))
    .then((response: any) => {
      return {
        id: response.ref.id,
        ...response.data,
      };
    });
}

export function productCreate(productInput: ProductCoreInput): Promise<ProductDB> {
  return FaunaClient()
    .query(
      q.Create(q.Collection("products"), {
        data: {
          ...productInput,
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

export function productEdit(id: string, productInput: ProductEditInput): Promise<ProductDB> {
  return FaunaClient()
    .query(
      q.Update(q.Ref(q.Collection("products"), id), {
        data: {
          ...productInput,
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

export function productEditPrice(id: string, priceInput: PriceInput): Promise<ProductDB> {
  return productEdit(id, { price: priceInput });
}

export function productEditSEO(id: string, seoInput: SEOInput): Promise<ProductDB> {
  return productEdit(id, { seo: seoInput });
}

export async function productEditDeliverability(id: string, deliveryInput: Deliverability): Promise<ProductDB> {
  return productEdit(id, { deliverability: deliveryInput });
}

export function productAddImage(id: string, imageInput: ImageInput): Promise<ProductDB> {
  return FaunaClient()
    .query(
      q.If(
        q.Contains(["data", "images"], q.Get(q.Ref(q.Collection("products"), id))),
        q.Select(["data", "images"], q.Get(q.Ref(q.Collection("products"), id))),
        []
      )
    )
    .then((response: any) => {
      const current = response as [Image];

      imageInput = {
        ...updateDates(),
        ...imageInput,
      };
      current.push(imageInput);

      return productEdit(id, { images: current });
    });
}


export function productLinkManufacturer(
  id: string,
  manufacturerId: string
): Promise<LinkResult> {
  return FaunaClient()
    .query(q.Do([
      q.Update(q.Ref(q.Collection("products"), id), {
        data: {
          manufacturer: {
            id: manufacturerId,
            data: q.Ref(q.Collection("manufacturers"), manufacturerId),
          }
        },
      }),
      q.Update(q.Ref(q.Collection("manufacturers"), manufacturerId), {
        data: {
          products: q.Append(q.Select(["data", "products"], q.Get(q.Ref(q.Collection("manufacturers"), manufacturerId)), []), [q.Ref(q.Collection("products"), id)])
        }
      })
    ])).then(() => {
      return new Promise(res => res({ result: true }));
    })
}

/*
export function productUnlinkManufacturer(
  _manufacturerId: string
): Promise<ProductDB> {
  return new Promise(res => res());
}
*/

export function productLinkCategory(
  id: string,
  categoryId: string
): Promise<LinkResult> {
  return FaunaClient()
    .query(q.Do([
      q.Update(q.Ref(q.Collection("products"), id), {
        data: {
          categories: q.Append(q.Select(["data", "categories"], q.Get(q.Ref(q.Collection("products"), id)), []), [q.Ref(q.Collection("categories"), categoryId)])
        },
      }),
      q.Update(q.Ref(q.Collection("categories"), categoryId), {
        data: {
          products: q.Append(q.Select(["data", "products"], q.Get(q.Ref(q.Collection("categories"), categoryId)), []), [q.Ref(q.Collection("products"), id)])
        }
      })
    ])).then(() => {
      return new Promise(res => res({ result: true }));
    })
}
/*
export function productUnlinkCategory(
  _categoryId: string
): Promise<ProductDB> {
  return new Promise(res => res());
}
*/
