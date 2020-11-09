export function addStyleTagToHead(styles: string, hash: string) {
  if (!document.getElementById(hash)) {
    const style = document.createElement("style");
    style.id = hash;
    style.setAttribute("corejamStyle", hash);
    style.textContent = styles;
    document.head.appendChild(style);
  }
}
