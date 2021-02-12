# auth-form-register



<!-- Auto Generated Below -->


## Properties

| Property    | Attribute | Description | Type       | Default     |
| ----------- | --------- | ----------- | ---------- | ----------- |
| `onFail`    | --        |             | `Function` | `undefined` |
| `onSuccess` | --        |             | `Function` | `undefined` |


## Dependencies

### Used by

 - [auth-route-register](../../routes)

### Depends on

- corejam-box
- corejam-form-container
- corejam-form-input
- corejam-form-submit

### Graph
```mermaid
graph TD;
  auth-form-register --> corejam-box
  auth-form-register --> corejam-form-container
  auth-form-register --> corejam-form-input
  auth-form-register --> corejam-form-submit
  corejam-form-input --> corejam-box
  corejam-form-input --> corejam-type
  auth-route-register --> auth-form-register
  style auth-form-register fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
