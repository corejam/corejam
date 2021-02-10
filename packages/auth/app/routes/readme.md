# auth-route-register

<!-- Auto Generated Below -->


## Dependencies

### Depends on

- [auth-header](../components/Header)
- [auth-form-register](../components/auth-form-register)

### Graph
```mermaid
graph TD;
  auth-route-register --> auth-header
  auth-route-register --> auth-form-register
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
  auth-form-register --> corejam-box
  auth-form-register --> corejam-form-container
  auth-form-register --> corejam-form-input
  auth-form-register --> corejam-form-submit
  style auth-route-register fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
