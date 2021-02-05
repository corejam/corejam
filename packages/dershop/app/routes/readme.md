# dershop-route-register

<!-- Auto Generated Below -->

## Properties

| Property | Attribute | Description | Type  | Default     |
| -------- | --------- | ----------- | ----- | ----------- |
| `param`  | `param`   |             | `any` | `undefined` |

## Dependencies

### Depends on

- [dershop-product](../components/product)
- [dershop-product-list](../components/dershop-product-list)
- [dershop-manufacturer](../components/dershop-manufacturer)
- [dershop-seo](../components/seo)

### Graph

```mermaid
graph TD;
  dershop-url --> dershop-product
  dershop-url --> dershop-product-list
  dershop-url --> dershop-manufacturer
  dershop-url --> dershop-seo
  dershop-product --> corejam-box
  dershop-product --> dershop-image
  dershop-product --> corejam-type
  dershop-product --> corejam-base-link
  dershop-product-list --> corejam-box
  dershop-product-list --> dershop-sidebar
  dershop-product-list --> corejam-type
  dershop-product-list --> corejam-grid
  dershop-product-list --> dershop-product-box
  dershop-product-list --> corejam-pagination
  dershop-sidebar --> corejam-box
  dershop-sidebar --> corejam-type
  dershop-sidebar --> corejam-base-link
  dershop-product-box --> corejam-box
  dershop-product-box --> corejam-base-link
  dershop-product-box --> corejam-image
  dershop-product-box --> corejam-type
  corejam-pagination --> corejam-box
  corejam-pagination --> corejam-base-link
  corejam-pagination --> corejam-type
  dershop-manufacturer --> corejam-box
  dershop-manufacturer --> corejam-type
  dershop-manufacturer --> dershop-product-list
  style dershop-url fill:#f9f,stroke:#333,stroke-width:4px
```

---

_Built with [StencilJS](https://stenciljs.com/)_
