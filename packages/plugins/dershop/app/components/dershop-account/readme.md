# dershop-account



<!-- Auto Generated Below -->


## Dependencies

### Used by

 - [dershop-route-account](../../routes)

### Depends on

- corejam-box
- corejam-type
- corejam-base-link
- corejam-form-container
- corejam-form-input
- corejam-form-submit
- auth-reset-password-form

### Graph
```mermaid
graph TD;
  dershop-account --> corejam-box
  dershop-account --> corejam-type
  dershop-account --> corejam-base-link
  dershop-account --> corejam-form-container
  dershop-account --> corejam-form-input
  dershop-account --> corejam-form-submit
  dershop-account --> auth-reset-password-form
  corejam-form-input --> corejam-box
  corejam-form-input --> corejam-type
  auth-reset-password-form --> corejam-box
  auth-reset-password-form --> corejam-type
  auth-reset-password-form --> corejam-form-container
  auth-reset-password-form --> corejam-form-input
  auth-reset-password-form --> corejam-base-link
  auth-reset-password-form --> corejam-form-submit
  dershop-route-account --> dershop-account
  style dershop-account fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
