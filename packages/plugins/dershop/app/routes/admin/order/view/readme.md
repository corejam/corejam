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
  dershop-order-view --> corejam-box
  dershop-order-view --> corejam-type
  style dershop-route-admin-order-view fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
