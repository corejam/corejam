# dershop-layout



<!-- Auto Generated Below -->


## Dependencies

### Depends on

- [dershop-header](../components/dershop-header)
- [dershop-footer](../components/dershop-footer)

### Graph
```mermaid
graph TD;
  dershop-layout --> dershop-header
  dershop-layout --> dershop-footer
  dershop-header --> corejam-box
  dershop-header --> corejam-base-link
  dershop-header --> dershop-icons-menu
  dershop-header --> dershop-icons-spotlight
  dershop-header --> dershop-logo
  dershop-header --> dershop-cart-mini
  dershop-header --> corejam-identity
  dershop-cart-mini --> dershop-icons-cart
  corejam-identity --> corejam-box
  corejam-identity --> corejam-type
  corejam-identity --> corejam-icons-account
  corejam-identity --> corejam-form-container
  corejam-identity --> corejam-form-input
  corejam-identity --> corejam-form-submit
  corejam-identity --> corejam-button
  corejam-form-input --> corejam-box
  corejam-form-input --> corejam-type
  dershop-footer --> corejam-box
  dershop-footer --> dershop-logo
  style dershop-layout fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
