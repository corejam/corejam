import { PluginResolver } from "../../../../shared/types/PluginResolver";
import { allCategories, categoryByUrl, categoryById, categoryCreate, categoryEdit } from "./Category";
import { configCreate, configEdit, configEditSEO, config } from "./Config";
import {
  allProducts,
  productByID,
  productByUrl,
  productCreate,
  productEdit,
  productEditPrice,
  productEditSEO,
  productEditDeliverability,
  productAddImage,
  productLinkManufacturer,
  productLinkCategory
} from "./Product";

import { orderUpdate, allOrders, orderById, orderCreate, ordersByCustomer } from "./Order";

import {
  manufacturerCreate,
  manufacturerByID,
  manufacturerByUrl,
  manufacturerEdit,
  manufacturerEditSEO,
  allManufacturers,
  manufacturersForSelect,
} from "./Manufacturer";

import { userRegister } from "./User"

import { objectFromURL, getSEOIndex } from "./SEO";

export const models: PluginResolver = {
  allCategories,
  categoryById,
  categoryCreate,
  categoryEdit,
  categoryByUrl,

  config,
  configCreate,
  configEdit,
  configEditSEO,

  allProducts,
  productByID,
  productByUrl,
  productCreate,
  productEdit,
  productEditPrice,
  productEditSEO,
  productEditDeliverability,
  productAddImage,
  productLinkManufacturer,
  productLinkCategory,

  orderUpdate,
  allOrders,
  orderById,
  orderCreate,
  ordersByCustomer,

  manufacturerCreate,
  manufacturerByID,
  manufacturerByUrl,
  manufacturerEdit,
  manufacturerEditSEO,
  allManufacturers,
  manufacturersForSelect,

  userRegister,

  objectFromURL,
  getSEOIndex,
};
