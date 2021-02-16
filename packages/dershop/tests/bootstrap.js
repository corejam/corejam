const args = require("args");
const { Client, query } = require("faunadb");
const q = query;
const { getDataClient } = require("@corejam/base/dist/PluginManager");

args.option("dbSecret", "Your DB Secret key (FaunaDB)").command("fauna", "Bootstrap a new faunaDB");

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

  await newClient.query(
    q.CreateIndex({
      name: "seoIndex",
      active: true,
      source: [
        q.Collection("products"),
        q.Collection("manufacturers"),
        q.Collection("categories"),
        q.Collection("canvasPages"),
      ],
      values: [{ field: ["data", "seo", "url"] }, { field: ["ref"] }],
    })
  );
}

try {
  go();
} catch (e) {
  console.log(e);
}
