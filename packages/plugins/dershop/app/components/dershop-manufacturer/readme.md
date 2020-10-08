# dershop-manufacturer



<!-- Auto Generated Below -->


## Properties

| Property       | Attribute | Description | Type                                                                                                                                                   | Default     |
| -------------- | --------- | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------- |
| `manufacturer` | --        |             | `Timestamp & { name: string; website?: string; description?: string; seo?: SEO; logo?: Image; products?: ProductDB[]; canvas?: object; } & DBDocument` | `undefined` |


## Dependencies

### Used by

 - [dershop-url](../../routes/seo)

### Depends on

- corejam-box
- corejam-type
- [dershop-product-list](../dershop-product-list)

### Graph
```mermaid
graph TD;
  dershop-manufacturer --> corejam-box
  dershop-manufacturer --> corejam-type
  dershop-manufacturer --> dershop-product-list
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
  dershop-url --> dershop-manufacturer
  style dershop-manufacturer fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
