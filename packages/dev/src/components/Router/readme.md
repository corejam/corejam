# app-router



<!-- Auto Generated Below -->


## Properties

| Property | Attribute | Description | Type     | Default     |
| -------- | --------- | ----------- | -------- | ----------- |
| `docs`   | `docs`    |             | `any`    | `undefined` |
| `mode`   | `mode`    |             | `string` | `undefined` |
| `routes` | `routes`  |             | `any`    | `undefined` |


## Dependencies

### Used by

 - [app-root](../App)

### Depends on

- [app-welcome](../Welcome)
- [app-liveview](../Liveview)
- [app-playground](../Playground)

### Graph
```mermaid
graph TD;
  app-router --> app-welcome
  app-router --> app-liveview
  app-router --> app-playground
  app-root --> app-router
  style app-router fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
