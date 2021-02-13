/** More than a simple hash generator */
export const generateHash = (s) => Math.floor(s.split("").reduce((a, b) => ((a << 5) - a + b.charCodeAt(0)) | 0, 0));

export const isBoolean = (val) => "boolean" === typeof val || val === "true";

export const lowercaseFirstLetter = (string) => string.charAt(0).toLowerCase() + string.slice(1);
export const uppercaseFirstLetter = (string) => string.charAt(0).toUpperCase() + string.slice(1);

export const addStyleTagToHead = (styles: string, hash?: string) => {
  if (!document.getElementById(hash)) {
    const style = document.createElement("style");
    if (hash) style.id = hash;
    style.setAttribute("corejamStyle", hash);
    style.textContent = styles;
    document.head.appendChild(style);
  }
};
