import { PluginResolver } from "../../../../shared/types/PluginResolver";
import { allCategories, categoryById, categoryByUrl, categoryCreate, categoryEdit } from "./Category";
import { config, configCreate, configEdit, configEditSEO } from "./Config";
import {
  allManufacturers,
  manufacturerByID,
  manufacturerByUrl,
  manufacturerCreate,
  manufacturerEdit,
  manufacturerEditSEO,
  manufacturersForSelect,
} from "./Manufacturer";
import { allOrders, orderById, orderCreate, ordersByCustomer, orderUpdate } from "./Order";
import {
  allProducts,
  productAddImage,
  productByID,
  productByUrl,
  productCreate,
  productEdit,
  productEditDeliverability,
  productEditPrice,
  productEditSEO,
  productLinkCategory,
  productLinkManufacturer,
} from "./Product";
import { getSEOIndex, objectFromURL } from "./SEO";
import { userCreate, userRegister } from "./User";

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
  userCreate,

  objectFromURL,
  getSEOIndex,
};
