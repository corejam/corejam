# auth-header



<!-- Auto Generated Below -->


## Dependencies

### Used by

 - [auth-layout](../../layout)

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
  corejam-identity --> corejam-base-link
  corejam-identity --> corejam-form-container
  corejam-identity --> corejam-flash
  corejam-identity --> corejam-form-input
  corejam-identity --> corejam-form-submit
  corejam-identity --> corejam-button
  corejam-flash --> corejam-box
  corejam-form-input --> corejam-box
  corejam-form-input --> corejam-type
  auth-layout --> auth-header
  style auth-header fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
