<p align="center">
<img width="100%" src="https://dershop.dev/static/logodarkHorizontal.svg" />
<a href="https://dershop.dev">Open Source Serverless Webhop</a> | 
<a href="mailto:hello@corejam.io">hello@corejam.io</a>
</p>

DerShop is a serverless webshop built with Corejam. 

# Usage

To start the development shop under examples/nextjs:

```bash
$ cd examples/nextjs
$ yarn dev
```

Visit: http://localhost:3000

GraphQL Playground: http://localhost:3000/api/graphql

# CDN / Ege Caching

Coming soon

# DB Bootstrap

We currently offer a bootstrap script to launch a new FaunaDB and have it bootstrapped with the schema & sample products.

Head over to [FaunaDB](https://fauna.com/) and under Account settings generate a new `Admin Key`. We will use this to bootstrap a new db, generate a new key and add data.

```bash
$ cd packages/plugins/dershop
$ node tests/bootstrap.js --help
  Usage: bootstrap.js [options] [command]

  Commands:
    fauna    Bootstrap a new faunaDB
    help     Display help
    version  Display version

  Options:
    -d, --dbSecret  Your DB Secret key (FaunaDB)
    -f, --faker     Add faker data to the database (disabled by default)
    -h, --help      Output usage information
    -v, --version   Output the version number
```

```bash
$ node tests/bootstrap.js --dbSecret <faunaAdminSecretKey>
Created DB
secret:<new_generated_db_secret>
waiting on index
Done in 12.30s.
```

Copy the `<new_generated_db_secret>` into your `<root>/examples/nextjs/.env` for the `SECRET_KEY`

Your `.env` should have the following values:

```bash
DB_DRIVER=DB_FAUNA
SECRET_KEY=<new_generated_db_secret>
```

Your local development instance should now connect to faunadB.

### Netlify deploy
Coming soon

### AWS Lambda Deploy 
Coming soon

### Vercel Deploy

To deploy the development shop to vercel we need to move our compiled dist/ folders from various packages into our
next shop to be uploaded with the deployment. (This step is only required for dev setup)

```bash
$ cd <lernaRoot>
$ node ./utils/hoistPackagesForDeployment.js
```

This will move packages into `/examples/nextjs` to allow us to deploy everything in one go.

We still have some manual steps for zeit, first run `vercel` inside your example shop to get a custom `my.project.now.sh` domain assigned. We will then use this to give the deployment environment variables for graphql:

```bash
$ now -e DB_DRIVER=fauna -e SECRET_KEY=<new_generated_db_secret> -e API_ORIGIN="https://my.project.now.sh"
```