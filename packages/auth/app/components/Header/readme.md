# corejam-auth-header



<!-- Auto Generated Below -->


## Dependencies

### Used by

 - [cj-route-admin](../../routes/admin/users)
 - [cj-route-admin-index](../../routes/admin/users)
 - [cj-route-admin-user-form](../../routes/admin/users/edit)
 - [cj-route-index](../../routes)
 - [cj-route-login](../../routes)
 - [cj-route-register](../../routes)

### Depends on

- corejam-box
- corejam-base-link
- [corejam-identity](../Identity)

### Graph
```mermaid
graph TD;
  corejam-auth-header --> corejam-box
  corejam-auth-header --> corejam-base-link
  corejam-auth-header --> corejam-identity
  corejam-identity --> corejam-box
  corejam-identity --> corejam-type
  corejam-identity --> corejam-icons-account
  corejam-identity --> corejam-form-container
  corejam-identity --> corejam-form-input
  corejam-identity --> corejam-form-submit
  corejam-identity --> corejam-button
  corejam-form-input --> corejam-box
  corejam-form-input --> corejam-type
  cj-route-admin --> corejam-auth-header
  cj-route-admin-index --> corejam-auth-header
  cj-route-admin-user-form --> corejam-auth-header
  cj-route-index --> corejam-auth-header
  cj-route-login --> corejam-auth-header
  cj-route-register --> corejam-auth-header
  style corejam-auth-header fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
