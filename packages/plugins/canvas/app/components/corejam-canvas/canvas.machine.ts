import { createMachine, assign, interpret, State } from "xstate";
// import { serialize } from "../../utils/utils"
import { createStore } from "@stencil/store";

interface CanvasContext {
  draggedElementInstance: HTMLElement;
  dx: number;
  dy: number;
  px?: number;
  py?: number;
  possibleTargets: HTMLElement[];
  possibleTarget: HTMLElement;
  _listeners: any[];
}

type CanvasStateSchema =
  | {
      value: "inactive";
      context: CanvasContext & {
        draggedElementInstance: null;
        possibleTargets: null;
        possibleTarget: null;
        editInstance: null;
      };
    }
  | {
      value: "active";
      context: CanvasContext & {
        draggedElementInstance: null;
        possibleTargets: null;
        possibleTarget: null;
      };
    }
  | {
      value: "edit";
      context: CanvasContext & {
        draggedElementInstance: null;
        possibleTargets: null;
        possibleTarget: null;
        editInstance: HTMLElement;
      };
    }
  | {
      value: "dragging";
      context: CanvasContext;
    }
  | {
      value: "drop";
      context: CanvasContext;
    };

type CanvasEvents = MouseEvent | { type: "reset" } | { type: "toggle" };

export const sendEventToMachine = (evt: CanvasEvents) => canvasService.send(evt);

const createNewNode = (tag: string) => {
  const tagNode = document.createElement(tag);
  tagNode.innerText = tagNode.localName;
  tagNode.dataset["component"] = tag;
  tagNode.dataset["inCanvas"] = "true";
  tagNode.style.userSelect = "none";
  tagNode.addEventListener("pointerdown", (event) => canvasService.send(event), { passive: true });
  return tagNode;
};

const highlight = (node: HTMLElement) => {
  if (!node.localName.includes("type")) {
    node.style.background = "var(--cj-colors-blue-100)";
    node.style.outline = "1px solid black";
    node.addEventListener("pointerover", sendEventToMachine, { passive: true });
  }
};
const removeHighlight = (node: HTMLElement, ev = true) => {
  node.style.removeProperty("background");
  node.style.removeProperty("outline");
  if (ev) node.removeEventListener("pointerover", sendEventToMachine, true);
};

const highlightDrop = (node: HTMLElement) => {
  const blacklist = ["corejame-type", "span"];
  if (!blacklist.includes(node.localName)) node.style.background = "var(--cj-colors-blue-300)";
};

const removeHighlightDrop = (node: HTMLElement) => {
  const blacklist = ["corejame-type", "span"];
  if (!blacklist.includes(node.localName)) node.style.background = "var(--cj-colors-blue-100)";
};

/**
 * Canas Machine
 *
 */
export const canvasMachine = createMachine<CanvasContext, CanvasEvents, CanvasStateSchema>(
  {
    id: "canvas-machine",
    initial: "inactive",
    context: {
      draggedElementInstance: null,
      possibleTargets: null,
      possibleTarget: null,
      dx: 0,
      dy: 0,
      px: 0,
      py: 0,
      _listeners: [],
    },
    states: {
      inactive: {
        id: "inactive",
        on: {
          toggle: { target: "active" },
          pointerup: {
            target: "edit",
            cond: "validElement",
            actions: ["saveEditInstance"],
          },
        },
        entry: ["initBaseCanvas", "removeAllListeners"],
      },
      edit: {
        on: {
          pointerup: [
            {
              target: "inactive",
              actions: ["removeEdit"],
              cond: "isCanvas",
            },
          ],
        },
        entry: ["showEdit"],
      },
      active: {
        id: "active",
        on: {
          toggle: { target: "inactive" },
          pointerdown: {
            target: "dragging",
            actions: ["onIdleToDragging"],
          },
        },
        entry: ["initDropzone"],
      },
      dragging: {
        initial: "outside",
        states: {
          outside: {
            on: {
              pointerover: {
                target: "inside",
                actions: ["highlightPossibleTarget"],
              },
              pointerup: {
                target: "#active",
                actions: ["onDraggingToIdle"],
              },
              pointerout: {
                internal: true,
                actions: ["reset"],
              },
            },
          },
          inside: {
            initial: "base",
            on: {
              pointermove: {
                internal: true,
                actions: ["highlightPossibleTarget", "mousemove"],
              },
              pointerup: {
                target: "#dropped",
                actions: ["dropItem"],
              },
              pointerout: {
                internal: true,
                actions: ["removeHighlightPossibleTarget"],
              },
              reset: {
                target: "outside",
                actions: ["unsetDrop"],
              },
              "inside.left": {
                target: "inside.left",
              },
              "inside.right": {
                target: "inside.right",
              },
              "inside.base": {
                target: "inside.base",
              },
            },
            states: {
              base: {},
              right: {
                // onEntry: (c) => (c.possibleTarget.style.borderRight = "5px solid gold"),
                // onExit: (c) => (c.possibleTarget.style.borderRight = ""),
              },
              left: {
                // onEntry: (c) => (c.possibleTarget.style.borderLeft = "5px solid gold"),
                // onExit: (c) => (c.possibleTarget.style.borderLeft = ""),
              },
            },
          },
        },
        entry: ["dragging"],
        on: {
          pointermove: {
            internal: true,
            actions: ["mousemove"],
          },
        },
      },
      dropped: {
        id: "dropped",
        after: {
          50: {
            target: "active",
            actions: ["onDraggingToIdle"],
          },
        },
      },
    },
  },
  {
    actions: {
      initBaseCanvas: () => {
        document.body.addEventListener("pointerup", sendEventToMachine);
        document.body.addEventListener("pointermove", sendEventToMachine, { passive: true });
      },
      initDropzone: assign(() => {
        const nodes = document.querySelectorAll("corejam-canvas .drop *");

        const _listeners = [];
        nodes.forEach((n) => {
          n.addEventListener(
            "pointerdown",
            (e: MouseEvent) => {
              sendEventToMachine(e);
            },
            { passive: true }
          );
          _listeners.push({ target: n, type: "pointerdown", listener: sendEventToMachine });
        });

        return {
          _listeners,
        };
      }),
      removeAllListeners: (context) =>
        context._listeners.forEach((l) => {
          l.target.removeEventListener(l.type, l.listener);
        }),
      onIdleToDragging: assign((_context: CanvasContext, event: MouseEvent) => {
        const target = event.target as HTMLElement;

        const canvas = document.querySelector("corejam-canvas .drop");
        const corejamElements = document.querySelectorAll("corejam-canvas .drop *");

        const possibleTargets = [];

        if (corejamElements.length > 0) {
          corejamElements.forEach((el: HTMLElement) => {
            if (el.localName.includes("corejam")) possibleTargets.push(el);
          });
        } else {
          const dropzone = document.querySelector(".drop") as HTMLElement;
          possibleTargets.push(dropzone);
        }

        target.style.pointerEvents = "none";

        canvas.addEventListener(
          "pointerout",
          () => {
            sendEventToMachine({ type: "reset" });
          },
          { passive: true }
        );

        return {
          draggedElementInstance: target,
          px: event.clientX,
          py: event.clientY,
          possibleTargets,
        };
      }),
      onDraggingToIdle: assign((context: CanvasContext) => {
        const dropNode = document.querySelector(".drop") as HTMLElement;
        removeHighlight(dropNode);

        context.possibleTargets.forEach((el) => removeHighlight(el), true);

        return {
          draggedElementInstance: null,
          possibleTargets: null,
          possibleTarget: null,
          dx: 0,
          dy: 0,
          px: 0,
          py: 0,
        };
      }),
      dragging: (context: CanvasContext) => {
        context.possibleTargets.forEach(highlight);
      },
      highlightPossibleTarget: (_c, event: MouseEvent) => {
        const possibleTarget = event.target as HTMLElement;
        highlightDrop(possibleTarget);
      },
      removeHighlightPossibleTarget: (_context, event: MouseEvent) => {
        const possibleTarget = event.target as HTMLElement;
        removeHighlightDrop(possibleTarget);
      },
      dropItem: (context, event: MouseEvent) => {
        const dropTarget = event.target as HTMLElement;
        const dropNode = document.querySelector(".drop") as HTMLElement;
        context.draggedElementInstance.style.removeProperty("transform");
        context.draggedElementInstance.style.removeProperty("pointer-events");
        if (dropNode.contains(context.draggedElementInstance)) {
          dropTarget.appendChild(context.draggedElementInstance);
        } else {
          const node = createNewNode(context.draggedElementInstance.innerText);
          dropTarget.appendChild(node);
        }
      },
      unsetDrop: (context) => {
        context.possibleTargets.forEach((el) => removeHighlightDrop(el));
      },
      showEdit: (context) => {
        const node = document.createElement("corejam-edit");
        //@ts-ignore
        node.node = context.editInstance;
        console.log(context);
        const canvas = document.querySelector("corejam-canvas .drop");
        canvas.after(node);
      },
      //@ts-ignore
      saveEditInstance: assign((_c: CanvasContext, event: MouseEvent) => {
        const target = event.target as HTMLElement;
        const cjTarget = target.localName.includes("corejam") ? target : target.parentNode;
        return {
          editInstance: cjTarget,
        };
      }),
      removeEdit: () => {
        document.querySelector("corejam-edit").remove();
      },
      reset: (context) => {
        context.possibleTargets.forEach((el) => removeHighlight(el, false));
      },
      mousemove: assign((context: CanvasContext, event: MouseEvent) => {
        return {
          dx: event.clientX - context.px,
          dy: event.clientY - context.py,
        };
      }),
    },
    guards: {
      isCanvas: (_c, e: MouseEvent) => {
        const canvas = document.querySelector("corejam-canvas .drop");
        return e.target === canvas;
      },
      validElement: (_c, e: MouseEvent) => {
        const canvas = document.querySelector("corejam-canvas .drop");
        return canvas.contains(e.target as HTMLElement) && e.target !== canvas;
      },
    },
  }
);

type CanvasState = {
  machine: State<CanvasContext, CanvasEvents, any, CanvasStateSchema>;
};

export const { state: canvasState, set: setCanvasState } = createStore<CanvasState>({
  machine: null,
});

export const canvasService = interpret(canvasMachine)
  .onTransition((state) => {
    if (!canvasState.machine) setCanvasState("machine", state);
    if (state.changed) {
      setCanvasState("machine", state);

      document.body.dataset.state = state.toStrings().join(" ");
      if (state.matches("dragging"))
        state.context.draggedElementInstance.style.transform = `translate(
            ${state.context.dx}px,
            ${state.context.dy}px)`;
    }
  })
  .start();
