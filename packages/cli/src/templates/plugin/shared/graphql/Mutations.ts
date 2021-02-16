export const pluginNameCreate = `
  mutation PluginNameCreate($pl: PluginNameCreateInput!) {
    pluginNameCreate(pluginNameCreateInput: $userCreateInput) {
      string
    }
  }
`;
