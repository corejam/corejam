const args = require("args");
const { bootstrapSchema } = require("@corejam/base/dist/Bootstrap");
const { getServerContext } = require("@corejam/base/dist/Server");
const {
  generateConfig,
  generateProduct,
  generateCategory,
  generateManufacturer,
  generateOrder,
  generateUser
} = require("../dist/server/resolvers/db/faker/Generator");
const { Client, query } = require("faunadb");
const q = query;
const { getDataClient } = require("@corejam/base/dist/PluginManager");

args
  .option("faker", "Add faker data to the database", false)
  .option("dbSecret", "Your DB Secret key (FaunaDB)")
  .command("fauna", "Bootstrap a new faunaDB");

const flags = args.parse(process.argv);
flags.dbSecret = flags.dbSecret ? flags.dbSecret : process.env.SECRET_KEY;

if (!flags.dbSecret) {
  throw new Error("Missing DB Secret");
}

let { COMMIT_ID } = process.env;
process.env.DB_DRIVER = "DB_FAUNA";

if (!COMMIT_ID) {
  COMMIT_ID = new Date().getMilliseconds().toString();
}

async function go() {
  let SECRET, newClient;

  const { models } = await getServerContext({ req: { headers: {} } });

  let client = new Client({ secret: flags.dbSecret });

  await client
    .query(q.CreateDatabase({ name: COMMIT_ID }))
    .then((res) => console.log("Created DB", res))
    .catch((e) => console.log(e));

  await client
    .query(
      q.CreateKey({
        database: q.Database(COMMIT_ID),
        role: "server",
      })
    )
    .then((res) => {
      SECRET = res.secret;
    })
    .catch((e) => console.log(e));

  console.log("secret:" + SECRET);

  try {
    newClient = getDataClient(
      "fauna",
      () => {
        return new Client({
          secret: SECRET,
        });
      },
      true
    );
  } catch (e) {
    console.log(e);
  }

  try {
    await newClient.query(q.CreateCollection({ name: "products" }));
    await newClient.query(q.CreateCollection({ name: "manufacturers" }));
    await newClient.query(q.CreateCollection({ name: "categories" }));
    await newClient.query(q.CreateCollection({ name: "users" }));
    await newClient.query(q.CreateCollection({ name: "config" }));
    await newClient.query(q.CreateCollection({ name: "orders" }));
    await newClient.query(q.CreateCollection({ name: "canvasPages" }));
  } catch (e) {
    console.log(e);
  }

  async function generateModels() {
    try {
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

      const products = [];
      const users = [];
      const manufacturers = []
      const categories = []
      console.log("generating data");
      for (let i = 0; i <= 5; i++) {
        manufacturers.push(await models.manufacturerCreate(generateManufacturer()).catch((e) => console.log(e)));
      }
      for (let i = 0; i < 2; i++) {
        categories.push(await models.categoryCreate(generateCategory()).catch((e) => console.log(e)));
      }

      for (let i = 0; i <= 20; i++) {
        const product = await models.productCreate(generateProduct()).catch((e) => console.log(e));
        const manufacturer = manufacturers[Math.floor(Math.random() * manufacturers.length)];
        const category = categories[Math.floor(Math.random() * categories.length)];

        products.push(product)

        await models.productLinkManufacturer(product.id, manufacturer.id)
        await models.productLinkCategory(product.id, category.id)
      }

      for (let i = 0; i <= 5; i++) {
        users.push(await models.userCreate(generateUser()).catch((e) => console.log(e)));
      }
      for (let i = 0; i <= 5; i++) {
        const order = generateOrder(products, users);
        await models.orderCreate(order, order.user).catch((e) => console.log(e));
      }

      await models
        .canvasPageCreate({
          seo: {
            url: "canvas",
          },
          canvas: { items: [] },
        })
        .catch((e) => console.log(e));

      const user = await models.userRegister({
        firstName: "Test",
        lastName: "Account",
        email: "test@test.com",
        password: "valid123Password@",
        passwordConfirm: "valid123Password@",
      });
      await models.userEdit(user.id, { role: ["admin"] });
    } catch (e) {
      console.log(e);
    }
  }

  await newClient.query(
    q.CreateIndex({
      name: "allCategories",
      active: true,
      source: q.Collection("categories"),
    })
  );
  await newClient.query(
    q.CreateIndex({
      name: "allManufacturers",
      active: true,
      source: q.Collection("manufacturers"),
    })
  );
  await newClient.query(
    q.CreateIndex({
      name: "allProducts",
      active: true,
      source: q.Collection("products"),
    })
  );
  await newClient.query(
    q.CreateIndex({
      name: "allUsers",
      active: true,
      source: q.Collection("users"),
    })
  );
  await newClient.query(
    q.CreateIndex({
      name: "allOrders",
      active: true,
      source: q.Collection("orders"),
    })
  );
  await newClient.query(
    q.CreateIndex({
      name: "allCanvasPages",
      active: true,
      source: q.Collection("canvasPages"),
    })
  );
  await newClient.query(
    q.CreateIndex({
      name: "userByEmail",
      active: true,
      source: q.Collection("users"),
      terms: [
        {
          field: ["data", "email"],
        },
      ],
    })
  );
  await newClient.query(
    q.CreateIndex({
      name: "configById",
      active: true,
      source: q.Collection("config"),
      terms: [
        {
          field: ["data", "id"],
        },
      ],
    })
  );
  await newClient.query(
    q.CreateIndex({
      name: "ordersByUser",
      active: true,
      source: q.Collection("orders"),
      terms: [
        {
          field: ["data", "user"],
        },
      ],
    })
  );

  await newClient
    .query(
      q.CreateIndex({
        name: "seoSearch",
        active: true,
        source: [
          q.Collection("products"),
          q.Collection("manufacturers"),
          q.Collection("categories"),
          q.Collection("canvasPages"),
        ],
        terms: [
          {
            field: ["data", "seo", "url"],
          },
        ],
      })
    )
    .catch((e) => console.log(e));

  await newClient
    .query(
      q.CreateIndex({
        name: "seoIndex",
        active: true,
        source: [
          q.Collection("products"),
          q.Collection("manufacturers"),
          q.Collection("categories"),
          q.Collection("canvasPages")
        ],
        values: [{ field: ["data", "seo", "url"] }, { field: ["ref"] }]
      })
    )

  if (flags.faker) await generateModels();
}

try {
  go();
} catch (e) {
  console.log(e);
}
