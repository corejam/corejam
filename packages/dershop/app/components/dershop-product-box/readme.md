# dershop-product-box

<!-- Auto Generated Below -->

## Properties

| Property | Attribute | Description | Type     | Default     |
| -------- | --------- | ----------- | -------- | ----------- |
| `image`  | `image`   |             | `string` | `undefined` |
| `name`   | `name`    |             | `string` | `undefined` |
| `price`  | `price`   |             | `number` | `undefined` |
| `url`    | `url`     |             | `string` | `undefined` |

## Methods

### `getDroppableElements() => Promise<string[]>`

#### Returns

Type: `Promise<string[]>`

## Dependencies

### Used by

- [dershop-product-list](../dershop-product-list)

### Depends on

- corejam-box
- corejam-base-link
- corejam-image
- corejam-type

### Graph

```mermaid
graph TD;
  dershop-product-box --> corejam-box
  dershop-product-box --> corejam-base-link
  dershop-product-box --> corejam-image
  dershop-product-box --> corejam-type
  dershop-product-list --> dershop-product-box
  style dershop-product-box fill:#f9f,stroke:#333,stroke-width:4px
```

---

_Built with [StencilJS](https://stenciljs.com/)_
