import { Config, ConfigDB, ConfigEditInput } from "@corejam/base/dist/typings/Config";
import { CoreResolver } from "@corejam/base/dist/typings/CoreResolver";
import { ImageInput } from "@corejam/base/dist/typings/Image";
import { ServerContext } from "@corejam/base/dist/typings/Server";
import { Deliverability } from "@corejam/base/dist/typings/Utils";
import { MergedServerContext as ExtendedNotifyContext } from "@corejam/notify/dist/server/types/PluginResolver";
import { MergedServerContext as ExtendedAuthContext } from "@corejam/plugin-auth/dist/server/types/PluginResolver";
import { CategoryCreateInput, CategoryEditInput } from "../../shared/types/Category";
import { ManufacturerCreateInput, ManufacturerEditInput } from "../../shared/types/Manufacturer";
import { OrderCreateInput, OrderEditInput, OrderList } from "../../shared/types/Order";
import { PriceInput } from "../../shared/types/Price";
import { ProductCoreInput } from "../../shared/types/Product";
import { SEODocument, SEOInput } from "../../shared/types/Seo";
import { RegisterInput, UserCreateInput, UserDB } from "../../shared/types/User";
import { Category } from "../Models/Category";
import { Manufacturer } from "../Models/Manufacturer";
import { Order } from "../Models/Order";
import { Product } from "../Models/Product";

export type LinkResult = {
  result: Boolean;
};

/**
 * We are adding these resolvers to the existing CoreResolver
 */
export declare type PluginResolver = {
  config(): Promise<ConfigDB>;
  configCreate(configInput: Config): Promise<ConfigDB>;
  configEdit(id: string, configInput: ConfigEditInput): Promise<ConfigDB>;
  configEditSEO(id: string, seoInput: SEOInput): Promise<ConfigDB>;
  categoryByUrl(slug: string): Promise<Category | null>;

  allProducts(): Promise<Product[]>;
  productByUrl(slug: string): Promise<Product | null>;
  productByID(id: string): Promise<Product | null>;
  productAddImage(id: string, imageInput: ImageInput): Promise<Product>;
  productCreate(productInput: ProductCoreInput): Promise<Product>;
  productEdit(id: string, productInput: ProductCoreInput): Promise<Product>;
  productEditPrice(id: string, priceInput: PriceInput): Promise<Product>;
  productEditSEO(id: string, seoInput: SEOInput): Promise<Product>;
  productEditDeliverability(id: string, deliveryInput: Deliverability): Promise<Product>;
  productLinkManufacturer(id: string, manufacturerId: string): Promise<LinkResult>;
  productLinkCategory(id: string, categoryId: string): Promise<LinkResult>;

  orderCreate(orderInput: OrderCreateInput, user: UserDB): Promise<Order>;
  orderUpdate(id: string, orderInput: OrderEditInput): Promise<Order>;
  allOrders(): Promise<Order[]>;
  ordersByCustomer(user: UserDB): Promise<OrderList>;
  orderById(id: string): Promise<Order | null>;

  manufacturersForSelect(): Promise<Manufacturer[]>;
  manufacturerByID(id: string): Promise<Manufacturer | null>;
  manufacturerByUrl(slug: string): Promise<Manufacturer | null>;
  manufacturerCreate(manufacturerInput: ManufacturerCreateInput): Promise<Manufacturer>;
  manufacturerEdit(id: string, manufacturerInput: ManufacturerEditInput): Promise<Manufacturer>;
  manufacturerEditSEO(id: string, seoInput: SEOInput): Promise<Manufacturer>;
  allManufacturers(): Promise<Manufacturer[]>;

  userRegister(userInput: RegisterInput): Promise<UserDB>;
  userCreate?(userCreateInput: UserCreateInput): Promise<UserDB>;

  allCategories(): Promise<Category[]>;
  categoryCreate(manufacturerInput: CategoryCreateInput): Promise<Category>;
  categoryEdit(id: string, manufacturerInput: CategoryEditInput): Promise<Category>;
  categoryById(id: string): Promise<Category | null>;

  objectFromURL(url: string): Promise<SEODocument | null>;
  getSEOIndex(): Promise<string[]>;
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
