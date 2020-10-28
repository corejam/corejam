# dershop-route-admin-order-view



<!-- Auto Generated Below -->


## Properties

| Property | Attribute | Description | Type  | Default     |
| -------- | --------- | ----------- | ----- | ----------- |
| `param`  | `param`   |             | `any` | `undefined` |


## Dependencies

### Depends on

- [dershop-header](../../../../components/dershop-header)
- [dershop-order-view](../../../../components/order-view)

### Graph
```mermaid
graph TD;
  dershop-route-admin-order-view --> dershop-header
  dershop-route-admin-order-view --> dershop-order-view
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
  corejam-identity --> corejam-form-container
  corejam-identity --> corejam-form-input
  corejam-identity --> corejam-form-submit
  corejam-identity --> corejam-button
  dershop-order-view --> corejam-box
  dershop-order-view --> corejam-type
  style dershop-route-admin-order-view fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
