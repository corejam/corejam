export { updateDates } from "./Functions";
export { updateCanvasPage } from "./mutations/Admin/Canvas";
export { updateConfigGQL, updateConfigSEOGQL } from "./mutations/Admin/Config";
export { canvasClosePeersGQL, canvasOpenPeersGQL } from "./mutations/Canvas";
export { getDataClient } from "./PluginManager";
export { canvasPagesPollPeersGQL } from "./queries/Admin/CanvasPages";
export { settingsGQL } from "./queries/Admin/Settings";
export { getLayoutConfigGQL, getSeoConfigGQL } from "./queries/Config";
export { getObjectFromURL } from "./queries/SEO";
export { CoreResolver } from "./typings/CoreResolver";
