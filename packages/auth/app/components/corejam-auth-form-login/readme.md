# corejam-auth-form-login



<!-- Auto Generated Below -->


## Properties

| Property    | Attribute | Description | Type       | Default     |
| ----------- | --------- | ----------- | ---------- | ----------- |
| `onFail`    | --        |             | `Function` | `undefined` |
| `onSuccess` | --        |             | `Function` | `undefined` |


## Dependencies

### Used by

 - [cj-route-login](../../routes)

### Depends on

- corejam-box
- corejam-form-container
- corejam-form-input
- corejam-form-submit

### Graph
```mermaid
graph TD;
  corejam-auth-form-login --> corejam-box
  corejam-auth-form-login --> corejam-form-container
  corejam-auth-form-login --> corejam-form-input
  corejam-auth-form-login --> corejam-form-submit
  corejam-form-input --> corejam-box
  corejam-form-input --> corejam-type
  cj-route-login --> corejam-auth-form-login
  style corejam-auth-form-login fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
