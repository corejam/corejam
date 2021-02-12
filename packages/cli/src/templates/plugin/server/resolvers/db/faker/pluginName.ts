import type { PluginName, PluginNameCreateInput } from "../../../../shared/types/pluginName";

const pluginName = [] as PluginName[];

export async function getAllPluginName(): Promise<PluginName[]> {
  return new Promise((res) => res(pluginName));
}

export function pluginNameCreate(pluginNameCreateInput: PluginNameCreateInput): Promise<PluginName> {
  //@ts-ignore
  pluginName.push(pluginNameCreateInput.pluginNameCreateInput);

  //@ts-ignore
  return new Promise((res) => res(pluginNameCreateInput.pluginNameCreateInput));
}
