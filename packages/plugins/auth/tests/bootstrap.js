const args = require("args");
const { bootstrapSchema } = require("@corejam/base/dist/Bootstrap");
const { getServerContext } = require("@corejam/base/dist/Server");
const {
  generateUser
} = require("@corejam/plugin-auth/dist/server/resolvers/db/faker/Generator");
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
  const schema = await bootstrapSchema();

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
    await newClient.query(q.CreateCollection({ name: "users" }));
    await newClient.query(q.CreateCollection({ name: "config" }));
  } catch (e) {
    console.log(e);
  }

  async function generateModels() {
    try {
      for (let i = 0; i <= 5; i++) {
        users.push(await models.userCreate(generateUser()).catch((e) => console.log(e)));
      }

      const user = await models.userRegister({
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
      name: "allUsers",
      active: true,
      source: q.Collection("users"),
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
    q.Create(q.Collection("config"), {
      data: {
        id: "schema",
        ...schema,
      },
    })
  );

  if (flags.faker) await generateModels();
}

try {
  go();
} catch (e) {
  console.log(e);
}
