# dershop-header

<!-- Auto Generated Below -->


## Properties

| Property         | Attribute         | Description | Type     | Default     |
| ---------------- | ----------------- | ----------- | -------- | ----------- |
| `cartLink`       | `cart-link`       |             | `string` | `"/cart/"`  |
| `mainLinks`      | `main-links`      |             | `any`    | `undefined` |
| `maxScreen`      | `max-screen`      |             | `string` | `"xl"`      |
| `secondaryLinks` | `secondary-links` |             | `any`    | `undefined` |
| `xAlign`         | `x-align`         |             | `string` | `"auto"`    |


## Dependencies

### Used by

 - [dershop-layout](../../layout)
 - [dershop-route-account](../../routes)
 - [dershop-route-admin-order-view](../../routes/admin/order/view)
 - [dershop-route-admin-orders](../../routes/admin/order)
 - [dershop-route-cart](../../routes)

### Depends on

- corejam-box
- corejam-base-link
- [dershop-icons-menu](../icons/icons-menu)
- [dershop-icons-spotlight](../icons/icons-spotlight)
- [dershop-logo](../icons/logo)
- [dershop-cart-mini](../dershop-cart-mini)
- corejam-identity

### Graph
```mermaid
graph TD;
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
  dershop-layout --> dershop-header
  dershop-route-account --> dershop-header
  dershop-route-admin-order-view --> dershop-header
  dershop-route-admin-orders --> dershop-header
  dershop-route-cart --> dershop-header
  style dershop-header fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
