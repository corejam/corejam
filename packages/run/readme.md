# Corejam Dev

This is a collection of useful web components for developing corejam applications and our own rollup plugin, which collects appliaction data, that is later user for application purposes. Idealy these components work in every stencil application or at least you could use single web components to enhance any kind of web application for developing / designing / organizing purposes.

## Why @corejam/dev

At first the `@corejam/dev` package is meant to be used within corejam applications. It is our approach to mimic specific behaviour, which you can see in tools like `next.js`. Our intention is to make this kind of stuff work soley in the browser with config files.

Because introspection of pure web components is not easy, we try to generate as much as possible information beforehand with our rollup plugin, so in every part of corejam based applications we use these kind of information to power special parts of the apps, like a simulated file based regex router.

## @rollup/plugin-corejam

In our corejam application we go a lot about convention over configuration. When you bootstrap a new app, you will see an `app` folder in the root of the generated plugin. This folder acts as the root source of the frontend of the application. A typical generated config object looks like

```
const config = {
    mode: "development",
    components: {},
    routes: {},
    wrapper: [],
    recommendations: [],
    dependencies: [],
    external: [],
    layout: null,
  };
```

As of now, we go about three different modes: `development`, `production`, `static`. Development and production are self explanatory. Static is used for prerendering whole applications, so we can omit specific parts of an app.
We collect all self written web components under the `components` key. As web component need to have a unique tag name, we use this to extract a special route for every component to have a nice developer experience, with many possibilities, like in place editing, attribute mocking, isolated development of a component.

Under the `routes` key we do collect special kinds of web components. From a technical stand point they are just regular web components like the others. But they act like wrapper components, that hold specific parts of an application together and make them accessible under a specific path, e.g. a route.
