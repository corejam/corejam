# dershop-cart

<!-- Auto Generated Below -->

## Dependencies

### Used by

- [dershop-route-cart](../../routes)

### Depends on

- corejam-box
- corejam-type
- corejam-form-container
- [dershop-cart-line](../dershop-cart-line)
- [dershop-order-totals](../dershop-order-totals)

### Graph

```mermaid
graph TD;
  dershop-cart --> corejam-box
  dershop-cart --> corejam-type
  dershop-cart --> corejam-form-container
  dershop-cart --> dershop-cart-line
  dershop-cart --> dershop-order-totals
  dershop-cart-line --> corejam-box
  dershop-cart-line --> corejam-image
  dershop-cart-line --> corejam-base-link
  dershop-cart-line --> corejam-type
  dershop-order-totals --> corejam-box
  dershop-order-totals --> corejam-type
  dershop-route-cart --> dershop-cart
  style dershop-cart fill:#f9f,stroke:#333,stroke-width:4px
```

---

_Built with [StencilJS](https://stenciljs.com/)_
