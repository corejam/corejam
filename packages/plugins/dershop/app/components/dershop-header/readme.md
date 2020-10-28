# dershop-header

<!-- Auto Generated Below -->


## Properties

| Property         | Attribute         | Description | Type     | Default     |
| ---------------- | ----------------- | ----------- | -------- | ----------- |
| `cartLink`       | `cart-link`       |             | `string` | `"/cart"`   |
| `mainLinks`      | `main-links`      |             | `any`    | `undefined` |
| `maxScreen`      | `max-screen`      |             | `string` | `"xl"`      |
| `secondaryLinks` | `secondary-links` |             | `any`    | `undefined` |
| `xAlign`         | `x-align`         |             | `string` | `"auto"`    |


## Dependencies

### Used by

 - [dershop-layout](../../layout)

### Depends on

- corejam-box
- [dershop-hamburger](../hambuger-menu)
- [dershop-inline-search](../dershop-inline-search)
- corejam-base-link
- [dershop-logo](../icons/logo)
- [dershop-cart-mini](../dershop-cart-mini)
- corejam-identity

### Graph
```mermaid
graph TD;
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
  dershop-layout --> dershop-header
  style dershop-header fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
