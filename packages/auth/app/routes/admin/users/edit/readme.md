# auth-route-admin-user-form



<!-- Auto Generated Below -->


## Properties

| Property | Attribute | Description | Type  | Default     |
| -------- | --------- | ----------- | ----- | ----------- |
| `param`  | `param`   |             | `any` | `undefined` |


## Dependencies

### Depends on

- [auth-header](../../../../components/Header)
- [auth-admin-user-form](../../../../components/auth-admin-user-form)

### Graph
```mermaid
graph TD;
  auth-route-admin-user-form --> auth-header
  auth-route-admin-user-form --> auth-admin-user-form
  auth-header --> corejam-box
  auth-header --> corejam-base-link
  auth-header --> corejam-identity
  corejam-identity --> corejam-box
  corejam-identity --> corejam-type
  corejam-identity --> corejam-icons-account
  corejam-identity --> corejam-form-container
  corejam-identity --> corejam-form-input
  corejam-identity --> corejam-form-submit
  corejam-identity --> corejam-button
  corejam-form-input --> corejam-box
  corejam-form-input --> corejam-type
  auth-admin-user-form --> corejam-box
  auth-admin-user-form --> corejam-type
  auth-admin-user-form --> corejam-form-container
  auth-admin-user-form --> corejam-form-input
  auth-admin-user-form --> corejam-form-select
  auth-admin-user-form --> corejam-form-submit
  corejam-form-select --> corejam-box
  corejam-form-select --> corejam-type
  style auth-route-admin-user-form fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
