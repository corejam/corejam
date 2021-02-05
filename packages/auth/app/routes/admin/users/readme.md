# cj-route-admin

<!-- Auto Generated Below -->

## Dependencies

### Depends on

- [corejam-auth-header](../../../components/Header)
- [auth-admin-user-list](../../../components/auth-admin-user-list)

### Graph

```mermaid
graph TD;
  cj-route-admin-index --> corejam-auth-header
  cj-route-admin-index --> auth-admin-user-list
  corejam-auth-header --> corejam-box
  corejam-auth-header --> corejam-base-link
  corejam-auth-header --> corejam-identity
  corejam-identity --> corejam-box
  corejam-identity --> corejam-type
  corejam-identity --> corejam-icons-account
  corejam-identity --> corejam-form-container
  corejam-identity --> corejam-form-input
  corejam-identity --> corejam-form-submit
  corejam-identity --> corejam-button
  corejam-form-input --> corejam-box
  corejam-form-input --> corejam-type
  auth-admin-user-list --> corejam-box
  auth-admin-user-list --> corejam-type
  auth-admin-user-list --> corejam-base-link
  auth-admin-user-list --> corejam-pagination
  corejam-pagination --> corejam-box
  corejam-pagination --> corejam-base-link
  corejam-pagination --> corejam-type
  style cj-route-admin-index fill:#f9f,stroke:#333,stroke-width:4px
```

---

_Built with [StencilJS](https://stenciljs.com/)_
