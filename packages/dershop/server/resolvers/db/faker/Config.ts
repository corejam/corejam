import { bootstrapSchema } from "@corejam/base/dist/Bootstrap";
import type { Config, ConfigDB, ConfigEditInput, ConfigGeneral } from "@corejam/base/dist/typings/Config";
import type { SEO } from "@corejam/base/dist/typings/Seo";
import { generateConfig } from "./Generator";

const seo: SEO = {
  metaTitle: "DerShop - Serverless Ecommerce System",
  metaDescription: "Open Source",
  keywords: ["ServerlessWebshopGraphql"],
  url: "/",
};

const generalConfig: ConfigGeneral = {
  admin_email: "hello@corejam.dev",
};

let configObject = generateConfig({
  seo: seo,
  general: generalConfig,
}) as ConfigDB;
configObject.id = "config";

export function config(): Promise<ConfigDB> {
  return new Promise((res) => res(configObject));
}

export function configCreate(configInput: Config): Promise<ConfigDB> {
  configObject = { id: "config2", ...configInput };
  return new Promise((res) => res(configObject));
}

export function configEdit(_id: string, configInput: ConfigEditInput): Promise<ConfigDB> {
  configObject = {
    ...configObject,
    ...configInput,
  };

  return new Promise((res) => res(configObject));
}

export function configEditSEO(_id: string, seoInput: SEO): Promise<ConfigDB> {
  configObject.seo = { ...seoInput };

  return new Promise((res) => res(configObject));
}

export async function schema(): Promise<any> {
  const schema = await bootstrapSchema();

  return new Promise((res) => res(schema));
}

export async function schemaEdit(): Promise<any> {
  return new Promise((res) => res(schema));
}
