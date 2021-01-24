import { addMenuTab } from "./store/runStore";

export default function () {
  addMenuTab({
    header: "Dev",
    content: "corejam-dev-welcome",
  });
}
