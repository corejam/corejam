<p align="center">
<img src="https://corejam.io/static/logo.png"/>
<a href="https://corejam.io">corejam.io</a> | 
<a href="mailto:hello@corejam.io">hello@corejam.io</a>
</p>

![Node.js CI](https://github.com/Corejam/corejam/workflows/Node.js%20CI/badge.svg)
[![codecov](https://codecov.io/gh/Corejam/corejam/branch/master/graph/badge.svg?token=7UEOPHF0W3)](https://codecov.io/gh/Corejam/corejam)

# Corejam is currently under heavy development and THERE IS NO STABLE RELEASE. We currently do not offer an upgrade path and there will be breaking changes until we hit 1.0.0

# If you have ideas for contributing please open an issue before investing time to make sure we can align everyone in the early stages.

## About Corejam

Corejam is a serverless first jamstack scaffolding focused on reusability and simplicity. Use it on its own or inside your favourite tool of choice.

## Core

At its base, Corejam will provide the following tools:

- A GraphQL endpoint which you can feed your schema(s) to quickly start querying / resolving against
- Plugin Mapper to easily allow third party developers to build new functionality or fully fledged serverless systems with ease
- Caching layer
- Server side render & Static site generation
- Bootstrapped web components to allow you to query your GraphQL endpoint and start building right away
- An event system to allow you to hook into and listen to events across the system
- A visual canvas to allow you to drag and drop web components from the web into the page you are building

## Auth

Basic JWT authentication plugin for corejam plugins.

....

## DerShop

Serverless webshop.

Latest master: <a href="https://demo.dershop.dev">demo.dershop.dev</a>

...


# Development Setup

We use lerna/yarn to manage our packages.

```bash
$ yarn global add lerna
```

Now from within the root we can let lerna bootstrap our packages:

```bash
$ lerna bootstrap
$ yarn build
```

# Usage

To start the development shop under examples/nextjs:

```bash
$ yarn dev
```

Visit: http://localhost:3000

GraphQL Playground: http://localhost:3000/api/graphql

# CDN / Ege Caching

...

# DB Bootstrap & Vercel Deploy

We currently offer a bootstrap script to launch a new FaunaDB and have it bootstrapped with the schema & sample products.

Head over to [FaunaDB](https://fauna.com/) and under Account settings generate a new `Admin Key`. We will use this to bootstrap a new db, generate a new key and add data.

```bash
$ node test/db/utils/bootstrap.js --help
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
$ node ./packages/plugins/dershop/tests/bootstrap.js --dbSecret <faunaAdminSecretKey>
Created DB
secret:<new_generated_db_secret>
waiting on index
Done in 12.30s.
```

Copy the `<new_generated_db_secret>` into your `<root>/examples/shop/.env` for the `SECRET_KEY`

Your `.env` should have the following values:

```bash
DB_DRIVER=DB_FAUNA
SECRET_KEY=<new_generated_db_secret>
```

Your local development instance should now connect to faunadB:

```bash
$ yarn dev
```

To deploy the development shop to vercel we need to move our compiled dist/ folders from various packages into our
next shop to be uploaded with the deployment. (This step is only required for dev setup)

```bash
$ cd <rootDir>
$ node ./utils/hoistPackagesForDeployment.js
```

This will move packages into `/examples/shop` to allow us to deploy everything in one go.

We still have some manual steps for zeit, first run `vercel` inside your example shop to get a custom `my.project.now.sh` domain assigned. We will then use this to give the deployment environment variables for graphql:

```bash
$ now -e DB_DRIVER=fauna -e SECRET_KEY=<new_generated_db_secret> -e DEPLOYMENT_URL="https://my.project.now.sh"
```
