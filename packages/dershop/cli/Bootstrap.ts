import { getServerContext } from "@corejam/base/dist/Server";
import { roles } from "@corejam/plugin-auth/dist/shared/types/User";
import {
  generateCategory,
  generateConfig,
  generateManufacturer,
  generateOrder,
  generateProduct,
  generateUser,
} from "../server/resolvers/db/faker/Generator";
import { CategoryDB } from "../shared/types/Category";
import { ManufacturerDB } from "../shared/types/Manufacturer";
import { OrderDB } from "../shared/types/Order";
import { MergedServerContext } from "../shared/types/PluginResolver";
import { ProductDB } from "../shared/types/Product";
import { UserDB } from "../shared/types/User";

declare type fakerData = {
  products: Array<ProductDB>;
  users: Array<UserDB>;
  manufacturers: Array<ManufacturerDB>;
  categories: Array<CategoryDB>;
  orders: Array<OrderDB>;
};

/**
 * Static faker generator
 */
export default async () => {
  const { models } = (await getServerContext({ req: { headers: {} }, res: {} })) as MergedServerContext;

  const data: fakerData = {
    products: [],
    users: [],
    manufacturers: [],
    categories: [],
    orders: [],
  };

  await models.configCreate(
    generateConfig({
      general: {
        admin_email: "hello@corejam.dev",
      },
      seo: {
        url: "/",
        keywords: ["Serverless webshop"],
        metaTitle: "DerShop - Serverless Ecommerce System",
        metaDescription: "Open Source",
      },
    })
  );

  for (let i = 0; i <= 5; i++) {
    const manufacturer = await models.manufacturerCreate(generateManufacturer());
    data.manufacturers.push(manufacturer);
  }

  for (let i = 0; i < 2; i++) {
    const category = await models.categoryCreate(generateCategory());
    data.categories.push(category);
  }

  for (let i = 0; i <= 20; i++) {
    const product = (await models.productCreate(generateProduct()).catch((e) => console.log(e))) as ProductDB;
    const manufacturer = data.manufacturers[Math.floor(Math.random() * data.manufacturers.length)];
    const category = data.categories[Math.floor(Math.random() * data.categories.length)];

    //Prevent cyclical error with faker
    if (process.env.DB_DRIVER === "DB_FAUNA") {
      await models.productLinkCategory(product.id, category.id);
      await models.productLinkManufacturer(product.id, manufacturer.id);
    } else {
      //@ts-ignore
      product.manufacturer = { ...(await models.manufacturerByID(manufacturer.id)) };
      product.categories = [{ ...((await models.categoryById(category.id)) as CategoryDB) }];
    }

    data.products.push(product);
  }

  for (let i = 0; i <= 5; i++) {
    const user = (await models.userCreate(generateUser())) as UserDB;
    data.users.push(user);
  }
  for (let i = 0; i <= 5; i++) {
    const order = generateOrder(data.products, data.users);
    const createdOrder = (await models.orderCreate(order, order.user)) as OrderDB;
    data.orders.push(createdOrder);
  }

  let user = await models.userRegister({
    firstName: "Test",
    lastName: "Account",
    email: "test@test.com",
    password: "valid123Password@",
    passwordConfirm: "valid123Password@",
  });
  user = (await models.userEdit(user.id, { role: [roles.ADMIN] })) as UserDB;

  data.users.push(user);

  return data;
};
