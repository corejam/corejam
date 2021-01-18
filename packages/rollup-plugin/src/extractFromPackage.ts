export function extractWrapper(pkgJson: any): any[] {
  return pkgJson.corejam?.wrapper ? pkgJson.corejam.wrapper : [];
}

export function extractRecos(pkgJson: any): any[] {
  return pkgJson.corejam?.recommendations ? pkgJson.corejam.recommendations : [];
}

export function extractExternal(pkgJson: any): any[] {
  return pkgJson.corejam?.external ? pkgJson.corejam.external : [];
}
