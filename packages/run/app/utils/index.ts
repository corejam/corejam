export function addTab(tab) {
  setTimeout(() => {
    const evt = new CustomEvent("addCorejamMenuTab", {
      detail: { tab },
    });
    document.dispatchEvent(evt);
  }, 500);
}
