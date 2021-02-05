# corejam-identity

<!-- Auto Generated Below -->

## Properties

| Property       | Attribute       | Description | Type     | Default        |
| -------------- | --------------- | ----------- | -------- | -------------- |
| `loginLink`    | `login-link`    |             | `string` | `"/login/"`    |
| `registerLink` | `register-link` |             | `string` | `"/register/"` |

## Dependencies

### Used by

- [corejam-auth-header](../Header)

### Depends on

- corejam-box
- corejam-type
- [corejam-icons-account](../icons/account)
- corejam-form-container
- corejam-form-input
- corejam-form-submit
- corejam-button

### Graph

```mermaid
graph TD;
  corejam-identity --> corejam-box
  corejam-identity --> corejam-type
  corejam-identity --> corejam-icons-account
  corejam-identity --> corejam-form-container
  corejam-identity --> corejam-form-input
  corejam-identity --> corejam-form-submit
  corejam-identity --> corejam-button
  corejam-form-input --> corejam-box
  corejam-form-input --> corejam-type
  corejam-auth-header --> corejam-identity
  style corejam-identity fill:#f9f,stroke:#333,stroke-width:4px
```

---

_Built with [StencilJS](https://stenciljs.com/)_
