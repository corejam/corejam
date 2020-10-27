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

# Usage 

### npm
```bash
$ npm i -g @corejam/cli
```

### yarn
```bash
$ yarn global add @corejam/cli
```

### Creating your first Corejam Application

```bash
$ corejam createApp <applicationName>
```

```bash
$ cd <applicationName>
$ yarn dev
```

You can now access the developer playground on `http://localhost:3001` and the API on `http://localhost:3000`

### Static build of your Application

To create a static build of your application run the following:

```bash
$ cd <applicationName>
$ corejam static
```


# Plugins maintained in this mono repo:
## Auth

Basic JWT authentication plugin for Corejam applications. [Read more](packages/plugins/auth/README.md)

A hassle free plug and play JWT authentication package for your Corejam applications.

# DerShop -  <a href="https://demo.dershop.dev">demo.dershop.dev</a>

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/git/external?repository-url=https%3A%2F%2Fgithub.com%2Fcorejam%2Fcorejam%2Ftree%2Fmaster%2Fexamples%2Fnextjs&env=JWT_HASH&envDescription=JWT_HASH%20can%20currently%20just%20be%20a%20random%20string.%20This%20is%20used%20to%20sign%20auth%20tokens&project-name=dershop&repository-name=dershop&redirect-url=https%3A%2F%2Fgithub.com%2Fcorejam%2Fcorejam&demo-title=DerShop%20-%20Serverless%20Ecommerce&demo-description=A%20statically%20generated%20webshop%20built%20with%20Corejam&demo-url=https%3A%2F%2Fdershop.dev&demo-image=https%3A%2F%2Fdershop.dev%2Fstatic%2Fimages%2FpreviewAlpha.jpg)

<p align="center">
<img width="50%" src="https://dershop.dev/static/logodarkHorizontal.svg" />
<img width="50%" src="https://dershop.dev/static/images/previewAlpha.jpg" />
</p>

Serverless webshop built with Corejam. [Read more](packages/plugins/dershop/README.md)

We currently only build React output targets but we plan on supporting all Stencil.js supported targets. Feel free to contact us if you want to help out.

# Mono repo development setup

We use lerna / yarn to manage our packages.

```bash
$ yarn --frozen-lockfile
$ yarn build
$ yarn bs
```

# Debugging configuration

If you are using VSCode you can use the commited vscode configuration to jump right in. Simply choose the configuration you want and hit run.

For hooking / debugging into the running corejam server boot the api in whichever package you like using `yarn corejam api:serve` and you can then run the `@corejam:api` configuration to select your running process.
