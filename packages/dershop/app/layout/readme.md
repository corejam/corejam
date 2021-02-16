# dershop-layout



<!-- Auto Generated Below -->


## Dependencies

### Depends on

- corejam-ui-base
- [dershop-header](../components/dershop-header)
- corejam-box
- [dershop-footer](../components/dershop-footer)

### Graph
```mermaid
graph TD;
  dershop-layout --> corejam-ui-base
  dershop-layout --> dershop-header
  dershop-layout --> corejam-box
  dershop-layout --> dershop-footer
  dershop-header --> corejam-box
  dershop-header --> dershop-hamburger
  dershop-header --> dershop-inline-search
  dershop-header --> corejam-base-link
  dershop-header --> dershop-logo
  dershop-header --> dershop-cart-mini
  dershop-header --> corejam-identity
  dershop-hamburger --> dershop-icons-menu
  dershop-hamburger --> corejam-box
  dershop-hamburger --> corejam-base-link
  dershop-hamburger --> corejam-type
  dershop-inline-search --> dershop-icons-spotlight
  dershop-inline-search --> corejam-box
  dershop-inline-search --> corejam-form-input
  corejam-form-input --> corejam-box
  corejam-form-input --> corejam-type
  dershop-cart-mini --> dershop-icons-cart
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
  dershop-footer --> corejam-box
  dershop-footer --> dershop-logo
  style dershop-layout fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
