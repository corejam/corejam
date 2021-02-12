# dershop-account



<!-- Auto Generated Below -->


## Dependencies

### Used by

 - [auth-route-account](../../routes)

### Depends on

- corejam-box
- corejam-type
- corejam-base-link
- corejam-form-container
- corejam-form-input
- corejam-form-submit
- [auth-reset-password-form](../ResetPasswordForm)

### Graph
```mermaid
graph TD;
  auth-account --> corejam-box
  auth-account --> corejam-type
  auth-account --> corejam-base-link
  auth-account --> corejam-form-container
  auth-account --> corejam-form-input
  auth-account --> corejam-form-submit
  auth-account --> auth-reset-password-form
  corejam-form-input --> corejam-box
  corejam-form-input --> corejam-type
  auth-reset-password-form --> corejam-box
  auth-reset-password-form --> corejam-type
  auth-reset-password-form --> corejam-form-container
  auth-reset-password-form --> corejam-form-input
  auth-reset-password-form --> corejam-form-submit
  auth-route-account --> auth-account
  style auth-account fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
