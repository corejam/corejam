# auth-admin-user-list



<!-- Auto Generated Below -->


## Properties

| Property | Attribute | Description | Type     | Default     |
| -------- | --------- | ----------- | -------- | ----------- |
| `data`   | `data`    |             | `any`    | `undefined` |
| `page`   | `page`    |             | `number` | `undefined` |


## Dependencies

### Used by

 - [auth-route-admin](../../routes/admin/users)
 - [auth-route-admin-index](../../routes/admin/users)

### Depends on

- corejam-box
- corejam-type
- corejam-base-link
- corejam-pagination

### Graph
```mermaid
graph TD;
  auth-admin-user-list --> corejam-box
  auth-admin-user-list --> corejam-type
  auth-admin-user-list --> corejam-base-link
  auth-admin-user-list --> corejam-pagination
  corejam-pagination --> corejam-box
  corejam-pagination --> corejam-base-link
  corejam-pagination --> corejam-type
  auth-route-admin --> auth-admin-user-list
  auth-route-admin-index --> auth-admin-user-list
  style auth-admin-user-list fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
