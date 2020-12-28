import { ConfigDB, Config, ConfigEditInput } from "@corejam/base/dist/typings/Config";
import { ImageInput } from "@corejam/base/dist/typings/Image";
import { ServerContext } from "@corejam/base/dist/typings/Server";
import { CoreResolver } from "@corejam/base/dist/typings/CoreResolver";
import { Category, CategoryDB } from "./Category";
import { ManufacturerCreateInput, ManufacturerDB, ManufacturerEditInput } from "./Manufacturer";
import { OrderDB, OrderEditInput, OrderCreateInput, OrderList } from "./Order";
import { PriceInput } from "./Price";
import { ProductCoreInput, ProductDB } from "./Product";
import { SEODocument, SEOInput } from "./Seo";
import { Deliverability } from "@corejam/base/dist/typings/Utils";
import { UserDB, RegisterInput, UserCreateInput } from "./User";
import { MergedServerContext as ExtendedAuthContext } from "@corejam/plugin-auth/shared/types/PluginResolver"
import { MergedServerContext as ExtendedNotifyContext } from "@corejam/notify/dist/server/types/PluginResolver"

export type LinkResult = {
  result: Boolean
}

/**
 * We are adding these resolvers to the existing CoreResolver
 */
export declare type PluginResolver = {
  config(): Promise<ConfigDB>;
  configCreate(configInput: Config): Promise<ConfigDB>;
  configEdit(id: string, configInput: ConfigEditInput): Promise<ConfigDB>;
  configEditSEO(id: string, seoInput: SEOInput): Promise<ConfigDB>;
  categoryByUrl(slug: string): Promise<CategoryDB | null>;

  allProducts(): Promise<ProductDB[]>;
  productByUrl(slug: string): Promise<ProductDB | null>;
  productByID(id: string): Promise<ProductDB | null>;
  productAddImage(id: string, imageInput: ImageInput): Promise<ProductDB>;
  productCreate(productInput: ProductCoreInput): Promise<ProductDB>;
  productEdit(id: string, productInput: ProductCoreInput): Promise<ProductDB>;
  productEditPrice(id: string, priceInput: PriceInput): Promise<ProductDB>;
  productEditSEO(id: string, seoInput: SEOInput): Promise<ProductDB>;
  productEditDeliverability(id: string, deliveryInput: Deliverability): Promise<ProductDB>;
  productLinkManufacturer(id: string, manufacturerId: string): Promise<LinkResult>;
  productLinkCategory(id: string, categoryId: string): Promise<LinkResult>;

  orderCreate(orderInput: OrderCreateInput, user: UserDB): Promise<OrderDB>;
  orderUpdate(id: string, orderInput: OrderEditInput): Promise<OrderDB>;
  allOrders(): Promise<OrderDB[]>;
  ordersByCustomer(user: UserDB): Promise<OrderList>;
  orderById(id: string): Promise<OrderDB | null>;

  manufacturersForSelect(): Promise<ManufacturerDB[]>;
  manufacturerByID(id: string): Promise<ManufacturerDB | null>;
  manufacturerByUrl(slug: string): Promise<ManufacturerDB | null>;
  manufacturerCreate(manufacturerInput: ManufacturerCreateInput): Promise<ManufacturerDB>;
  manufacturerEdit(id: string, manufacturerInput: ManufacturerEditInput): Promise<ManufacturerDB>;
  manufacturerEditSEO(id: string, seoInput: SEOInput): Promise<ManufacturerDB>;
  allManufacturers(): Promise<ManufacturerDB[]>;

  userRegister(userInput: RegisterInput): Promise<UserDB>
  userCreate?(userCreateInput: UserCreateInput): Promise<UserDB>

  allCategories(): Promise<CategoryDB[]>;
  categoryCreate(manufacturerInput: Category): Promise<CategoryDB>;
  categoryEdit(id: string, manufacturerInput: Category): Promise<CategoryDB>;
  categoryById(id: string): Promise<CategoryDB | null>;

  objectFromURL(url: string): Promise<SEODocument | null>;
  getSEOIndex(): Promise<string[]>
};

export declare type MergedServerResolver = CoreResolver & PluginResolver;

/**
 * We are adding an optional user to the core context if we have it.
 * Merge with exisiting ServerContext
 */
export declare type PluginServerContext = Partial<ExtendedAuthContext>;

/**
 * Override models to include our Plugin resolver
 */
export declare type MergedServerContext = Partial<ServerContext> &
  ExtendedNotifyContext &
  PluginServerContext & {
    models: MergedServerResolver;
  };
