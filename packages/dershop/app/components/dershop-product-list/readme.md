# dershop-product-list

<!-- Auto Generated Below -->

## Properties

| Property  | Attribute | Description | Type      | Default     |
| --------- | --------- | ----------- | --------- | ----------- |
| `default` | `default` |             | `boolean` | `false`     |
| `list`    | `list`    |             | `any`     | `undefined` |
| `page`    | --        |             | `Number`  | `1`         |
| `size`    | --        |             | `Number`  | `24`        |

## Dependencies

### Used by

- [dershop-manufacturer](../dershop-manufacturer)
- [dershop-route-products](../../routes)
- [dershop-url](../../routes)

### Depends on

- corejam-box
- [dershop-sidebar](../sidebar)
- corejam-type
- corejam-grid
- [dershop-product-box](../dershop-product-box)
- corejam-pagination

### Graph

```mermaid
graph TD;
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
  dershop-manufacturer --> dershop-product-list
  dershop-route-products --> dershop-product-list
  dershop-url --> dershop-product-list
  style dershop-product-list fill:#f9f,stroke:#333,stroke-width:4px
```

---

_Built with [StencilJS](https://stenciljs.com/)_
