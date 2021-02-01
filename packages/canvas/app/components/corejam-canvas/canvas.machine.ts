import { createMachine, assign, interpret, State } from "xstate";
import { createStore } from "@stencil/store";
import { createNewNode, highlight, highlightDrop, removeHighlight, removeHighlightDrop } from "./utils";

export type Dragger = {
  id: string;
  label: string;
  component: string;
  props?: any;
  initialContent?: string;
};

interface CanvasContext {
  draggedElementInstance: HTMLElement;
  dx: number;
  dy: number;
  px?: number;
  py?: number;
  _listeners: any[];
  _actions?: any[];
}

type CanvasStateSchema =
  | {
      value: "inactive";
      context: CanvasContext & {
        draggedElementInstance: null;
        editInstance: null;
      };
    }
  | {
      value: "active";
      context: CanvasContext & {
        draggedElementInstance: null;
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

type CanvasEvents = MouseEvent | { type: "reset" } | { type: "inactive" } | { type: "active" } | { type: "outside" };

export const sendEventToMachine = (evt: CanvasEvents) => canvasService.send(evt);

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
      dx: 0,
      dy: 0,
      px: 0,
      py: 0,
      _listeners: [],
      _actions: [],
    },
    states: {
      inactive: {
        id: "inactive",
        on: {
          active: { target: "active" },
        },
        entry: [
          () => {
            document.querySelector("corejam-tabs").addEventListener("tabSelected", (event: CustomEvent) => {
              if (event.detail === "corejam-builder") {
                sendEventToMachine({ type: "active" });
              } else {
                sendEventToMachine({ type: "inactive" });
              }
            });
          },
          "removeAllListeners",
        ],
      },
      active: {
        id: "active",
        on: {
          inactive: { target: "inactive" },
          pointerdown: {
            target: "dragging",
            actions: ["onIdleToDragging"],
          },
        },
        entry: ["initBaseCanvas", "initializeElementsForDraggingInsideCanvas"],
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
            },
            entry: ["dragging"],
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
              outside: {
                target: "outside",
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
      /**
       * We set up our base event listener to track mousemove and pointer up events
       */
      initBaseCanvas: () => {
        document.body.addEventListener("pointerup", sendEventToMachine);
        document.body.addEventListener("pointermove", sendEventToMachine, { passive: true });
      },
      /**
       * Setup pointerdown events in case of dragging of elements, that are already in canvas
       */
      initializeElementsForDraggingInsideCanvas: assign(() => {
        // We collect all childrend for now
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
        const rootDropzone = document.querySelector(".drop") as HTMLElement;
        rootDropzone.addEventListener("pointerover", (e: MouseEvent) => {
          sendEventToMachine(e);
        });
        rootDropzone.addEventListener("pointerout", (e: MouseEvent) => {
          sendEventToMachine({ type: "outside" });
        });

        target.style.pointerEvents = "none";
        const menu = document.querySelector("corejam-menu") as HTMLElement;

        if (event.composedPath().includes(menu)) {
          target.style.zIndex = "1000";
          target.style.position = "fixed";
        }

        return {
          draggedElementInstance: target,
          px: event.clientX,
          py: event.clientY,
        };
      }),
      onDraggingToIdle: assign((context: CanvasContext) => {
        const corejamElements = document.querySelectorAll<HTMLElement>("corejam-canvas .drop *");
        const rootDropzone = document.querySelector(".drop") as HTMLElement;
        removeHighlight(rootDropzone);
        corejamElements.forEach((c) => removeHighlight(c));

        context.draggedElementInstance.style.removeProperty("pointer-events");
        context.draggedElementInstance.style.removeProperty("zIndex");
        context.draggedElementInstance.style.removeProperty("position");
        context.draggedElementInstance.style.removeProperty("transform");

        return {
          draggedElementInstance: null,
          dx: 0,
          dy: 0,
          px: 0,
          py: 0,
        };
      }),
      dragging: () => {
        const corejamElements = document.querySelectorAll("corejam-canvas .drop *");
        const rootDropzone = document.querySelector(".drop") as HTMLElement;
        highlight(rootDropzone);
        corejamElements.forEach(highlight);
      },
      highlightPossibleTarget: (_c, event: MouseEvent) => {
        const possibleTarget = event.target as HTMLElement;
        const menu = document.querySelector("corejam-menu") as HTMLElement;
        if (event.composedPath().includes(menu)) return;
        highlightDrop(possibleTarget);
      },
      removeHighlightPossibleTarget: (_context, event: MouseEvent) => {
        const possibleTarget = event.target as HTMLElement;
        removeHighlightDrop(possibleTarget);
      },
      dropItem: assign((context, event: MouseEvent) => {
        const dropTarget = event.target as HTMLElement;
        const dropNode = document.querySelector(".drop") as HTMLElement;
        context.draggedElementInstance.style.removeProperty("pointer-events");
        context.draggedElementInstance.style.removeProperty("zIndex");
        context.draggedElementInstance.style.removeProperty("position");
        context.draggedElementInstance.style.removeProperty("transform");
        if (dropNode.contains(context.draggedElementInstance)) {
          dropTarget.appendChild(context.draggedElementInstance);
          const evt = new CustomEvent("corejam:canvas:change");
          document.dispatchEvent(evt);
        } else {
          const node = createNewNode(context.draggedElementInstance);
          dropTarget.append(node);
          const evt = new CustomEvent("corejam:canvas:change");
          document.dispatchEvent(evt);
          return {
            _actions: [
              () => {
                node.remove();
              },
              ...context._actions,
            ],
          };
        }
      }),
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

export const { state: canvasState, set: setCanvasState, onChange: onCanvasChange } = createStore<CanvasState>({
  machine: null,
});

//@ts-ignore
window.undo = () => {
  const fn = canvasState.machine.context._actions.shift();
  fn();
};
export const canvasService = interpret(canvasMachine)
  .onTransition((state) => {
    if (!canvasState.machine) setCanvasState("machine", state);
    if (state.changed) {
      setCanvasState("machine", state);
      document.body.dataset.state = state.toStrings().join(" ");
      if (state.context.draggedElementInstance) {
        state.context.draggedElementInstance.style.transform = `translate(
            ${state.context.dx}px,
            ${state.context.dy}px)`;
      }
    }
  })
  .start();
