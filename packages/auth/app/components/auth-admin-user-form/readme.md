# auth-admin-user-form

<!-- Auto Generated Below -->

## Properties

| Property | Attribute | Description | Type      | Default     |
| -------- | --------- | ----------- | --------- | ----------- |
| `error`  | `error`   |             | `boolean` | `false`     |
| `formId` | `form-id` |             | `string`  | `undefined` |

## Dependencies

### Used by

- [cj-route-admin-user-form](../../routes/admin/users/edit)

### Depends on

- corejam-box
- corejam-type
- corejam-form-container
- corejam-form-input
- corejam-form-select
- corejam-form-submit

### Graph

```mermaid
graph TD;
  auth-admin-user-form --> corejam-box
  auth-admin-user-form --> corejam-type
  auth-admin-user-form --> corejam-form-container
  auth-admin-user-form --> corejam-form-input
  auth-admin-user-form --> corejam-form-select
  auth-admin-user-form --> corejam-form-submit
  corejam-form-input --> corejam-box
  corejam-form-input --> corejam-type
  corejam-form-select --> corejam-box
  corejam-form-select --> corejam-type
  cj-route-admin-user-form --> auth-admin-user-form
  style auth-admin-user-form fill:#f9f,stroke:#333,stroke-width:4px
```

---

_Built with [StencilJS](https://stenciljs.com/)_
