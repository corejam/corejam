# corejam-modal



<!-- Auto Generated Below -->


## Properties

| Property  | Attribute | Description | Type                                | Default     |
| --------- | --------- | ----------- | ----------------------------------- | ----------- |
| `message` | `message` |             | `string`                            | `undefined` |
| `type`    | `type`    |             | `"error" \| "success" \| "warning"` | `"success"` |


## Events

| Event                 | Description | Type               |
| --------------------- | ----------- | ------------------ |
| `corejam:modal:close` |             | `CustomEvent<any>` |


## Dependencies

### Used by

 - [corejam-data-fetcher](../Data)
 - [corejam-data-provider](../Data)

### Depends on

- [corejam-box](../Box)
- [corejam-grid](../Grid)
- [corejam-type](../Type)

### Graph
```mermaid
graph TD;
  corejam-modal --> corejam-box
  corejam-modal --> corejam-grid
  corejam-modal --> corejam-type
  corejam-data-fetcher --> corejam-modal
  corejam-data-provider --> corejam-modal
  style corejam-modal fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
