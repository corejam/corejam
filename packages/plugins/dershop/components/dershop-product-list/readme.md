# dershop-product-list

<!-- Auto Generated Below -->


## Properties

| Property   | Attribute  | Description | Type     | Default     |
| ---------- | ---------- | ----------- | -------- | ----------- |
| `products` | `products` |             | `string` | `undefined` |


## Dependencies

### Depends on

- corejam-box
- [dershop-ui-grid](../dershop-ui-grid)
- [dershop-product-box](../dershop-product-box)

### Graph
```mermaid
graph TD;
  dershop-product-list --> corejam-box
  dershop-product-list --> dershop-ui-grid
  dershop-product-list --> dershop-product-box
  dershop-product-box --> corejam-box
  dershop-product-box --> dershop-image
  dershop-product-box --> corejam-base-link
  style dershop-product-list fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
