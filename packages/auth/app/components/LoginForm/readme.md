# auth-form-login



<!-- Auto Generated Below -->


## Properties

| Property    | Attribute | Description | Type       | Default     |
| ----------- | --------- | ----------- | ---------- | ----------- |
| `onFail`    | --        |             | `Function` | `undefined` |
| `onSuccess` | --        |             | `Function` | `undefined` |


## Dependencies

### Used by

 - [auth-route-login](../../routes)

### Depends on

- corejam-box
- corejam-flash
- corejam-form-container
- corejam-form-input
- corejam-form-submit
- corejam-base-link

### Graph
```mermaid
graph TD;
  auth-form-login --> corejam-box
  auth-form-login --> corejam-flash
  auth-form-login --> corejam-form-container
  auth-form-login --> corejam-form-input
  auth-form-login --> corejam-form-submit
  auth-form-login --> corejam-base-link
  corejam-flash --> corejam-box
  corejam-form-input --> corejam-box
  corejam-form-input --> corejam-type
  auth-route-login --> auth-form-login
  style auth-form-login fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
