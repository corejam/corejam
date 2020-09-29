# @corejam/base

This package provides bootstraping functionality to Corejam applications.

Usage: 

```bash
npm install @corejam/base
```

### Bootstrap process

In order to bootstrap corejam apps we go through the dependancies defined in your project `package.json` in order to find corejam packages. 

After finding relevant packages we iterate over them & their dependancies recursively in order to find all corejam schemas / server resolvers that need to be loaded in the correct order.

For example your project has the following dependancies

```json
dependancies: {
    "next": "latest",
    "@corejam/plugin-dershop": "latest",
    "some-other-package: "latest"
}
```

First we iterate over all packages and extract `@corejam/plugin-dershop` by its `corejam` identifier in its package.json

Then in turn we need to look at the dependancies of `@corejam/plugin-dershop` recursively and do the exact same thing if we can identify any more corejam apps.

Once we have the correct order to load schemas and resolvers we can go ahead and merge the context together into one bootstrapped app.
