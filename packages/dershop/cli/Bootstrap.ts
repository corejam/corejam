import { getServerContext } from "@corejam/base/dist/Server";
import { User } from "@corejam/plugin-auth/server/Models/User";
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
import { MergedServerContext } from "../server/types/PluginResolver";
import { ProductDB } from "../shared/types/Product";
import { UserDB } from "../shared/types/User";
import { Category } from "../server/Models/Category";
import { Product } from "../server/Models/Product";
import { Manufacturer } from "../server/Models/Manufacturer";
import { Order } from "../server/Models/Order";

declare type fakerData = {
  products: Array<Product>;
  users: Array<User>;
  manufacturers: Array<Manufacturer>;
  categories: Array<Category>;
  orders: Array<Order>;
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
    const product = (await models.productCreate(generateProduct()).catch((e) => console.log(e))) as Product;
    const manufacturer = data.manufacturers[Math.floor(Math.random() * data.manufacturers.length)] as Manufacturer;
    const category = data.categories[Math.floor(Math.random() * data.categories.length)] as Category;

    //Prevent cyclical error with faker
    if (process.env.DB_DRIVER === "DB_FAUNA") {
      await models.productLinkCategory(product.id, category.id);
      await models.productLinkManufacturer(product.id, manufacturer.id);
    } else {
      //@ts-ignore
      product.manufacturer = { ...(await models.manufacturerByID(manufacturer.id)) };
      product.categories = [{ ...((await models.categoryById(category.id))) }];
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
  user = (await models.userEdit(user.id, { role: [User.ROLES.ADMIN] })) as UserDB;

  data.users.push(user);

  return data;
};
