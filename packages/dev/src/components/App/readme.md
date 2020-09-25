# app-root



<!-- Auto Generated Below -->


## Properties

| Property | Attribute | Description | Type      | Default |
| -------- | --------- | ----------- | --------- | ------- |
| `static` | `static`  |             | `boolean` | `false` |


## Dependencies

### Depends on

- [app-static-router](../StaticRouter)
- [app-router](../Router)

### Graph
```mermaid
graph TD;
  app-root --> app-static-router
  app-root --> app-router
  app-static-router --> app-welcome
  app-router --> app-welcome
  app-router --> app-liveview
  app-router --> app-playground
  style app-root fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
