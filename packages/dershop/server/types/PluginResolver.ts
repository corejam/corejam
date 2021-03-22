import { Config, ConfigDB, ConfigEditInput } from "@corejam/base/dist/typings/Config";
import { CoreResolver } from "@corejam/base/dist/typings/CoreResolver";
import { ID } from "@corejam/base/dist/typings/DB";
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
import { RegisterInput, UserCreateInput } from "../../shared/types/User";
import { Category } from "../Models/Category";
import { Manufacturer } from "../Models/Manufacturer";
import { Order } from "../Models/Order";
import { Product } from "../Models/Product";
import { User } from "../Models/User";

export type LinkResult = {
  result: Boolean;
};

/**
 * We are adding these resolvers to the existing CoreResolver
 */
export declare type PluginResolver = {
  config(): Promise<ConfigDB>;
  configCreate(configInput: Config): Promise<ConfigDB>;
  configEdit(id: ID, configInput: ConfigEditInput): Promise<ConfigDB>;
  configEditSEO(id: ID, seoInput: SEOInput): Promise<ConfigDB>;
  categoryByUrl(slug: string): Promise<Category | null>;

  allProducts(): Promise<Product[]>;
  productByUrl(slug: string): Promise<Product | null>;
  productByID(id: ID): Promise<Product | null>;
  productAddImage(id: ID, imageInput: ImageInput): Promise<Product>;
  productCreate(productInput: ProductCoreInput): Promise<Product>;
  productEdit(id: ID, productInput: ProductCoreInput): Promise<Product>;
  productEditPrice(id: ID, priceInput: PriceInput): Promise<Product>;
  productEditSEO(id: ID, seoInput: SEOInput): Promise<Product>;
  productEditDeliverability(id: ID, deliveryInput: Deliverability): Promise<Product>;
  productLinkManufacturer(id: ID, manufacturerId: ID): Promise<LinkResult>;
  productLinkCategory(id: ID, categoryId: ID): Promise<LinkResult>;

  orderCreate(orderInput: OrderCreateInput, user: User): Promise<Order>;
  orderUpdate(id: ID, orderInput: OrderEditInput): Promise<Order>;
  allOrders(): Promise<Order[]>;
  ordersByCustomer(user: User): Promise<OrderList>;
  orderById(id: ID): Promise<Order | null>;

  manufacturersForSelect(): Promise<Manufacturer[]>;
  manufacturerByID(id: ID): Promise<Manufacturer | null>;
  manufacturerByUrl(slug: string): Promise<Manufacturer | null>;
  manufacturerCreate(manufacturerInput: ManufacturerCreateInput): Promise<Manufacturer>;
  manufacturerEdit(id: ID, manufacturerInput: ManufacturerEditInput): Promise<Manufacturer>;
  manufacturerEditSEO(id: ID, seoInput: SEOInput): Promise<Manufacturer>;
  allManufacturers(): Promise<Manufacturer[]>;

  userRegister(userInput: RegisterInput): Promise<User>;
  userCreate?(userCreateInput: UserCreateInput): Promise<User>;

  allCategories(): Promise<Category[]>;
  categoryCreate(manufacturerInput: CategoryCreateInput): Promise<Category>;
  categoryEdit(id: ID, manufacturerInput: CategoryEditInput): Promise<Category>;
  categoryById(id: ID): Promise<Category | null>;

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
