# dershop-product

<!-- Auto Generated Below -->

## Properties

| Property            | Attribute     | Description                                                                                                                      | Type                                                                                                                                                                                                                                                                                                                                                                 | Default                                 |
| ------------------- | ------------- | -------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------- |
| `description`       | `description` | Product Description                                                                                                              | `string`                                                                                                                                                                                                                                                                                                                                                             | `undefined`                             |
| `droppableElements` | --            |                                                                                                                                  | `string[]`                                                                                                                                                                                                                                                                                                                                                           | `["dershop-ui-box", "dershop-ui-grid"]` |
| `images`            | `images`      | Images provided to enhance the product as a slideshow. Provided either through comma separated string or as an array of strings. | `[] \| string`                                                                                                                                                                                                                                                                                                                                                       | `undefined`                             |
| `mainImage`         | `main-image`  | Image to be used for main hero image of the product.                                                                             | `string`                                                                                                                                                                                                                                                                                                                                                             | `undefined`                             |
| `name`              | `name`        | Main Product Name                                                                                                                | `string`                                                                                                                                                                                                                                                                                                                                                             | `undefined`                             |
| `price`             | `price`       | Already formatted price as string with currency symbol                                                                           | `number`                                                                                                                                                                                                                                                                                                                                                             | `undefined`                             |
| `product`           | `product`     |                                                                                                                                  | `Timestamp & { sku?: string; ean?: string; manufacturer_number?: string; active: boolean; promoted: boolean; manufacturer?: ManufacturerRefence; categories?: CategoryDB[]; name: string; description?: string; deliverability?: Deliverability; seo?: SEO; images?: Image[]; price?: Price; canvas?: object; dateCreated: string; dateUpdated: string; } \| string` | `undefined`                             |
| `url`               | `url`         |                                                                                                                                  | `string`                                                                                                                                                                                                                                                                                                                                                             | `undefined`                             |

## Events

| Event                | Description | Type               |
| -------------------- | ----------- | ------------------ |
| `productAddedToCart` |             | `CustomEvent<any>` |

## Dependencies

### Used by

- [dershop-url](../../routes)

### Depends on

- corejam-box
- [dershop-image](../dershop-image)
- corejam-type
- corejam-base-link

### Graph

```mermaid
graph TD;
  dershop-product --> corejam-box
  dershop-product --> dershop-image
  dershop-product --> corejam-type
  dershop-product --> corejam-base-link
  dershop-url --> dershop-product
  style dershop-product fill:#f9f,stroke:#333,stroke-width:4px
```

---

_Built with [StencilJS](https://stenciljs.com/)_
