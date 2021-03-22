import { getServerContext } from "@corejam/base/dist/Server";
import {
  generateCategory,
  generateConfig,
  generateManufacturer,
  generateOrder,
  generateProduct,
  generateUser,
} from "../server/resolvers/db/faker/Generator";
import { MergedServerContext } from "../server/types/PluginResolver";
import { Category } from "../server/Models/Category";
import { Product } from "../server/Models/Product";
import { Manufacturer } from "../server/Models/Manufacturer";
import { Order } from "../server/Models/Order";
import { User } from "../server/Models/User";

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
    const category = await (await (generateCategory())).save();
    data.categories.push(category);
  }

  for (let i = 0; i <= 20; i++) {
    const product = await (await generateProduct()).save();
    const manufacturer = data.manufacturers[Math.floor(Math.random() * data.manufacturers.length)] as Manufacturer;
    const category = data.categories[Math.floor(Math.random() * data.categories.length)] as Category;

    //Prevent cyclical error with faker
    if (process.env.DB_DRIVER === "DB_FAUNA") {
      await models.productLinkCategory(product.id, category.id);
      await models.productLinkManufacturer(product.id, manufacturer.id);
    } else {
      product.manufacturer = manufacturer;
      product.categories = [category];
    }

    data.products.push(product);
  }

  for (let i = 0; i <= 5; i++) {
    const user = (await models.userCreate(await generateUser())) as User;
    data.users.push(user);
  }
  for (let i = 0; i <= 5; i++) {
    const order = await generateOrder(data.products, data.users);
    data.orders.push(await order.save());
  }

  let user = await models.userRegister({
    firstName: "Test",
    lastName: "Account",
    email: "test@test.com",
    password: "valid123Password@",
    passwordConfirm: "valid123Password@",
  });

  user = (await models.userEdit(user.id, { role: [User.ROLES.ADMIN] })) as User;
  data.users.push(user);

  return data;
};
