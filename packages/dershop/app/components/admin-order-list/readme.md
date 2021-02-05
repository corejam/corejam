# dershop-admin-order-list

<!-- Auto Generated Below -->

## Properties

| Property | Attribute | Description | Type     | Default     |
| -------- | --------- | ----------- | -------- | ----------- |
| `data`   | `data`    |             | `any`    | `undefined` |
| `page`   | `page`    |             | `number` | `undefined` |

## Dependencies

### Used by

- [dershop-route-admin-orders](../../routes/admin/order)

### Depends on

- corejam-box
- corejam-type
- corejam-base-link
- corejam-pagination

### Graph

```mermaid
graph TD;
  dershop-admin-order-list --> corejam-box
  dershop-admin-order-list --> corejam-type
  dershop-admin-order-list --> corejam-base-link
  dershop-admin-order-list --> corejam-pagination
  corejam-pagination --> corejam-box
  corejam-pagination --> corejam-base-link
  corejam-pagination --> corejam-type
  dershop-route-admin-orders --> dershop-admin-order-list
  style dershop-admin-order-list fill:#f9f,stroke:#333,stroke-width:4px
```

---

_Built with [StencilJS](https://stenciljs.com/)_
