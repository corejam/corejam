# dershop-account

<!-- Auto Generated Below -->

## Dependencies

### Depends on

- corejam-box
- corejam-type
- corejam-base-link
- corejam-form-container
- corejam-form-input
- corejam-form-submit
- [auth-reset-password-form](../auth-reset-password-form)

### Graph

```mermaid
graph TD;
  corejam-auth-account --> corejam-box
  corejam-auth-account --> corejam-type
  corejam-auth-account --> corejam-base-link
  corejam-auth-account --> corejam-form-container
  corejam-auth-account --> corejam-form-input
  corejam-auth-account --> corejam-form-submit
  corejam-auth-account --> auth-reset-password-form
  corejam-form-input --> corejam-box
  corejam-form-input --> corejam-type
  auth-reset-password-form --> corejam-box
  auth-reset-password-form --> corejam-type
  auth-reset-password-form --> corejam-form-container
  auth-reset-password-form --> corejam-form-input
  auth-reset-password-form --> corejam-base-link
  auth-reset-password-form --> corejam-form-submit
  style corejam-auth-account fill:#f9f,stroke:#333,stroke-width:4px
```

---

_Built with [StencilJS](https://stenciljs.com/)_
