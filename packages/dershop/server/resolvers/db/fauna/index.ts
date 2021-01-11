import { PluginResolver } from "../../../../shared/types/PluginResolver";
import { allCategories, categoryById, categoryCreate, categoryEdit, categoryByUrl } from "./Category";
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
  productLinkCategory,
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
import { objectFromURL, getSEOIndex } from "./SEO";
import { userRegister, userCreate } from "./User"

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
  getSEOIndex
};
