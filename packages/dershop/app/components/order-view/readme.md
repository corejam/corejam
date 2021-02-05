# dershop-order-view

<!-- Auto Generated Below -->

## Properties

| Property  | Attribute  | Description | Type     | Default     |
| --------- | ---------- | ----------- | -------- | ----------- |
| `orderId` | `order-id` |             | `string` | `undefined` |

## Dependencies

### Used by

- [dershop-route-account-order](../../routes/account/order)
- [dershop-route-admin-order-view](../../routes/admin/order/view)

### Depends on

- corejam-box
- corejam-type

### Graph

```mermaid
graph TD;
  dershop-order-view --> corejam-box
  dershop-order-view --> corejam-type
  dershop-route-account-order --> dershop-order-view
  dershop-route-admin-order-view --> dershop-order-view
  style dershop-order-view fill:#f9f,stroke:#333,stroke-width:4px
```

---

_Built with [StencilJS](https://stenciljs.com/)_
