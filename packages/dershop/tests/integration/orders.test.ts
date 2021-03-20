import { Paginated } from "@corejam/base/dist/typings/Utils";
import { testClient } from "@corejam/base/src/TestClient";
import * as faker from "faker";
import { advanceTo } from "jest-date-mock";
import { generateAddress, generateOrder, generateUser } from "../../server/resolvers/db/faker/Generator";
import { orderById } from "../../shared/graphql/Queries/Order";
import { OrderDB, OrderEditInput } from "../../shared/types/Order";
import { PluginResolver } from "../../server/types/PluginResolver";
import { ProductCoreInput, ProductDB } from "../../shared/types/Product";
import { UserDB } from "../../shared/types/User";

describe("Orders", () => {
  advanceTo(new Date(2020, 5, 27, 0, 0, 0)); // reset to date time.

  //This is the document ID we use to run various tests against instead of reading in every test
  let testID, client, models: PluginResolver, inserted;

  let user: UserDB;

  //Bootstrap
  beforeAll(async () => {
    client = await testClient();
    models = client.models;

    const testProduct: ProductCoreInput = {
      active: true,
      promoted: false,
      name: faker.commerce.product(),
      description: faker.random.words(),
      ean: faker.random.uuid(),
      manufacturer_number: faker.random.uuid(),
      sku: faker.random.uuid(),
    };

    const insertedProduct = (await models.productCreate(testProduct));

    //@ts-ignore
    user = await models.userCreate(generateUser());

    const testValues = await generateOrder([insertedProduct], [user]);

    inserted = (await models.orderCreate(testValues, user));
    expect(inserted).toMatchObject(testValues);

    testID = inserted.id;
  });

  it("getOrderById", async () => {
    const { query } = client;

    //Test that we can retrieve the same values back
    const returnedOrderById = await query({
      query: orderById,
      variables: { id: testID },
    });

    expect(returnedOrderById.data.orderById.user).toBeDefined();

    expect(inserted).toMatchObject(returnedOrderById.data.orderById);
  });

  it("allOrders", async () => {
    const returnedPagination = await models.allOrders();

    expect(returnedPagination[0].user).toBeDefined();
    expect(returnedPagination.length).toBeGreaterThanOrEqual(0);
  });

  it("updateOrder", async () => {
    const newValues: OrderEditInput = {
      addressBilling: generateAddress(),
      addressShipping: generateAddress(),
    };

    const editResult = await models.orderUpdate(testID, newValues);

    expect(editResult).toEqual(expect.objectContaining(newValues));
  });

  it("ordersByCustomer", async () => {
    const returnedPagination: Paginated = await models.ordersByCustomer(user);

    expect(returnedPagination).toHaveProperty("items");
    expect(returnedPagination.items.length).toBeGreaterThanOrEqual(1);
  });
});
