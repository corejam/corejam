# auth-header



<!-- Auto Generated Below -->


## Dependencies

### Used by

 - [cj-route-admin](../../routes/admin/users)
 - [cj-route-admin-index](../../routes/admin/users)
 - [cj-route-admin-user-form](../../routes/admin/users/edit)
 - [cj-route-index](../../routes)
 - [auth-route-login](../../routes)
 - [auth-route-register](../../routes)

### Depends on

- corejam-box
- corejam-base-link
- [corejam-identity](../Identity)

### Graph
```mermaid
graph TD;
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
  cj-route-admin --> auth-header
  cj-route-admin-index --> auth-header
  cj-route-admin-user-form --> auth-header
  cj-route-index --> auth-header
  auth-route-login --> auth-header
  auth-route-register --> auth-header
  style auth-header fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
