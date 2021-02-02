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
}

type CanvasStateSchema =
  | {
      value: "inactive";
      context: CanvasContext & {
        draggedElementInstance: null;
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

type CanvasEvent = MouseEvent | { type: "inactive" } | { type: "active" } | { type: "outside" };

export const sendEventToMachine = (evt: CanvasEvent) => canvasService.send(evt);

/**
 * Canas Machine
 *
 */
const canvasMachine = createMachine<CanvasContext, CanvasEvent, CanvasStateSchema>(
  {
    id: "canvas-machine",
    initial: "inactive",
    context: {
      draggedElementInstance: null,
      dx: 0,
      dy: 0,
      px: 0,
      py: 0,
    },
    states: {
      inactive: {
        id: "inactive",
        on: {
          active: { target: "active" },
        },
        entry: ["listenForCorjamTab", "listenForCorejamMenu"],
      },
      active: {
        id: "active",
        on: {
          inactive: { target: "inactive", actions: ["cleanupEventListeners"] },
          pointerdown: {
            target: "dragging",
            actions: ["onIdleToDragging"],
            cond: "isDraggable",
          },
        },
        entry: ["initBaseCanvas", "enableSelectAndTouch", "initElementsAlreadyInCavas"],
      },
      dragging: {
        initial: "outside",
        entry: ["disableSelectAndTouch"],
        states: {
          outside: {
            on: {
              pointerover: {
                target: "inside",
                actions: ["highlightTargets"],
                cond: "isOutsideMenu",
              },
              pointerup: {
                target: "#active",
                actions: ["onDraggingToIdle"],
              },
            },
            entry: ["dragging"],
          },
          inside: {
            on: {
              pointermove: {
                internal: true,
                actions: ["highlightTargets", "mousemove"],
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
      listenForCorejamMenu: () => {
        document.querySelector("corejam-menu").addEventListener("hideCorejamMenu", () => {
          console.log("bye");
        });
      },
      listenForCorjamTab: () => {
        document.querySelector("corejam-tabs").addEventListener("tabSelected", (event: CustomEvent) => {
          if (event.detail === "corejam-builder") {
            sendEventToMachine({ type: "active" });
          } else {
            sendEventToMachine({ type: "inactive" });
          }
        });
      },
      disableSelectAndTouch: () => {
        document.body.style.userSelect = "none";
        document.body.style.touchAction = "none";
      },
      enableSelectAndTouch: () => {
        document.body.style.removeProperty("user-select");
        document.body.style.removeProperty("touch-action");
      },
      initBaseCanvas: () => {
        document.body.addEventListener("pointerup", sendEventToMachine, { passive: true });
        document.body.addEventListener("pointermove", sendEventToMachine, { passive: true });
        document.body.addEventListener("pointerdown", sendEventToMachine, { passive: true });
        document.body.addEventListener("pointerover", sendEventToMachine, { passive: true });
        document.body.addEventListener("pointerout", sendEventToMachine, { passive: true });
        document.querySelector<HTMLElement>(".drop").addEventListener("pointerout", () => {
          sendEventToMachine({ type: "outside" });
        });
      },
      initElementsAlreadyInCavas: () => {
        document.querySelectorAll<HTMLElement>(".drop *").forEach((node) => {
          if (node.localName === "corejam-box" || node.localName === "corejam-type") {
            node.dataset.draggable = "true";
            node.dataset.inCanvas = "true";
          }
        });
      },
      cleanupEventListeners: () => {
        document.body.removeEventListener("pointerup", sendEventToMachine);
        document.body.removeEventListener("pointermove", sendEventToMachine);
        document.body.removeEventListener("pointerdown", sendEventToMachine);
        document.body.removeEventListener("pointerover", sendEventToMachine);
        document.body.removeEventListener("pointerout", sendEventToMachine);
        document.querySelector<HTMLElement>(".drop").removeEventListener("pointerout", () => {
          sendEventToMachine({ type: "outside" });
        });
      },
      onIdleToDragging: assign((_context: CanvasContext, event: MouseEvent) => {
        const target = event.target as HTMLElement;

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
      highlightTargets: (_c, event: MouseEvent) => {
        const possibleTarget = event.target as HTMLElement;
        const menu = document.querySelector("corejam-menu") as HTMLElement;
        if (event.composedPath().includes(menu)) return;
        highlightDrop(possibleTarget);
      },
      removeHighlightPossibleTarget: (_context, event: MouseEvent) => {
        const possibleTarget = event.target as HTMLElement;
        removeHighlightDrop(possibleTarget);
      },
      dropItem: (context, event: MouseEvent) => {
        const dropTarget = event.target as HTMLElement;
        context.draggedElementInstance.style.removeProperty("pointer-events");
        context.draggedElementInstance.style.removeProperty("zIndex");
        context.draggedElementInstance.style.removeProperty("position");
        context.draggedElementInstance.style.removeProperty("transform");
        if ("inCanvas" in context.draggedElementInstance.dataset) {
          dropTarget.appendChild(context.draggedElementInstance);
          const evt = new CustomEvent("corejam:canvas:change");
          document.dispatchEvent(evt);
        } else {
          const node = createNewNode(context.draggedElementInstance);
          dropTarget.append(node);
          const evt = new CustomEvent("corejam:canvas:change");
          document.dispatchEvent(evt);
        }
      },
      mousemove: assign((context: CanvasContext, event: MouseEvent) => {
        return {
          dx: event.clientX - context.px,
          dy: event.clientY - context.py,
        };
      }),
    },
    guards: {
      isDraggable: (_c, e: MouseEvent) => {
        const target = e.target as HTMLElement;
        return "draggable" in target.dataset;
      },
      isOutsideMenu: (_c, e: MouseEvent) => {
        const menu = document.querySelector<HTMLElement>("corejam-menu");
        return !e.composedPath().includes(menu);
      },
    },
  }
);

/**
 *
 * Stencil store to expose reactive machine state
 */

type CanvasState = {
  machine: State<CanvasContext, CanvasEvent, any, CanvasStateSchema>;
};

export const { state: canvasState } = createStore<CanvasState>({
  machine: null,
});

export const canvasService = interpret(canvasMachine)
  .onTransition((state) => {
    if (!canvasState.machine) canvasState.machine = state;
    if (state.changed) {
      canvasState.machine = state;
      document.body.dataset.state = state.toStrings().join(" ");
      if (state.context.draggedElementInstance) {
        requestAnimationFrame(() => {
          state.context.draggedElementInstance.style.transform = `translate(
              ${state.context.dx}px,
              ${state.context.dy}px)`;
        });
      }
    }
  })
  .start();
