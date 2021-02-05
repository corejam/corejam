# dershop-route-admin-orders

<!-- Auto Generated Below -->

## Properties

| Property | Attribute | Description | Type  | Default     |
| -------- | --------- | ----------- | ----- | ----------- |
| `param`  | `param`   |             | `any` | `undefined` |

## Dependencies

### Depends on

- [dershop-admin-order-list](../../../components/admin-order-list)

### Graph

```mermaid
graph TD;
  dershop-route-admin-orders --> dershop-admin-order-list
  dershop-admin-order-list --> corejam-box
  dershop-admin-order-list --> corejam-type
  dershop-admin-order-list --> corejam-base-link
  dershop-admin-order-list --> corejam-pagination
  corejam-pagination --> corejam-box
  corejam-pagination --> corejam-base-link
  corejam-pagination --> corejam-type
  style dershop-route-admin-orders fill:#f9f,stroke:#333,stroke-width:4px
```

---

_Built with [StencilJS](https://stenciljs.com/)_
