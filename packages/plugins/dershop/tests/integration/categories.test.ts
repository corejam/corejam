import * as faker from "faker";
import { adminCategoryByIdGQL } from "../../shared/graphql/Queries/Admin/Category";
import { Category, CategoryDB } from "../../shared/types/Category";
import { PluginResolver } from "../../shared/types/PluginResolver";
//@ts-ignore
import { testClient } from "../../src/TestClient";

describe("Categories", () => {
  //Init some singletons in beforeAll()
  let testID, client, models: PluginResolver;

  const testCategoryValues = {
    description: faker.lorem.sentences(),
    name: faker.company.companyName(),
    active: true,
  } as Category;

  //Bootstrap
  beforeAll(async () => {
    client = await testClient();
    (models = models), ({ models } = client);

    const insertedResponse = (await models.categoryCreate(testCategoryValues)) as CategoryDB;
    expect(insertedResponse).toMatchObject(testCategoryValues);
    testID = insertedResponse.id;
    //testUrl = insertedResponse.seo?.url;
  });

  //Test that we can retrieve the same values back
  it("getCategoryById", async () => {
    const { query } = client;

    const returnedCategoryById = await query({
      query: adminCategoryByIdGQL,
      variables: {
        id: testID,
      },
    });

    expect(returnedCategoryById.data.categoryById).toEqual(expect.objectContaining(testCategoryValues));
  });

  it("allCategories", async () => {
    const returnedPagination: CategoryDB[] = await models.allCategories();

    expect(returnedPagination.length).toBeGreaterThan(0);
    returnedPagination.map((item) => {
      if (item.id === testID) {
        expect(item).toEqual(expect.objectContaining(testCategoryValues));
      }
    });
  });

  it("updateCategory", async () => {
    const newValues = {
      description: faker.lorem.sentences(),
      name: faker.company.companyName(),
      active: true,
    } as Category;

    const editResult = await models.categoryEdit(testID, newValues);

    expect(editResult).toEqual(expect.objectContaining(newValues));
  });

  /*
    it("updateCategorySEO", async () => {
        const seo = {
            url: faker.lorem.slug(3),
            meta_title: faker.commerce.product(),
            meta_description: faker.lorem.sentence(),
            keywords: faker.lorem.words(3).split(' '),
          } as Typings.seo.SEO
 
        const editResult = await categoryEditSEO(testID, seo)
        expect(editResult).toEqual(
            expect.objectContaining({ seo: seo })
        )
    });
    */
});
