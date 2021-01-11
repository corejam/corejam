import { createMachine, assign, interpret, State } from "xstate";
import { createStore } from "@stencil/store";


export type Dragger = {
  id: string;
  label: string,
  component: string,
  props?: any,
  initialContent?: string
}


interface CanvasContext {
  draggedElementInstance: HTMLElement;
  dx: number;
  dy: number;
  px?: number;
  py?: number;
  possibleTargets: HTMLElement[];
  possibleTarget: HTMLElement;
  _listeners: any[];
  _actions?: any[]

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
      value: "deployment";
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

type CanvasEvents = MouseEvent | { type: "reset" } | {type: "inactive"} | { type: "build" } | { type: "deployment" };

export const sendEventToMachine = (evt: CanvasEvents) => canvasService.send(evt);


/**
 * 
 * @param tag 
 * 
 * Helper function to create dom nodes and hook to append meta info to these node.
 * 
 */
const createNewNode = (instance: HTMLElement) => {
  const cmp = JSON.parse(instance.dataset["cmp"]);
  const newNode = document.createElement(cmp.component);
  newNode.setAttribute("key", cmp.component + JSON.stringify(cmp.props))
  Object.keys(cmp.props).forEach(k => newNode.setAttribute(k, cmp.props[k]));
  if (cmp.component.includes("type")) newNode.innerText = "Dummy text"
  newNode.addEventListener("pointerdown", (event) => canvasService.send(event), { passive: true });
  return newNode;
};


/**
 * 
 * @param node; String 
 * 
 * Highlight a given dom node 
 */
const highlight = (node: HTMLElement) => {
  if (!node.localName.includes("type")) {
    node.style.background = "var(--cj-colors-blue-100)";
    node.style.outline = "1px solid black";
    // node.addEventListener("pointerover", sendEventToMachine, { passive: true });
    // node.addEventListener("pointerout", sendEventToMachine, { passive: true });
  }
};

/**
 * 
 * @param node: HTMLElement
 * @param ev: boolean 
 * 
 * Remove highlight from given domnode and potentially remove event listener.
 */
const removeHighlight = (node: HTMLElement, ev = true) => {
  node.style.removeProperty("background");
  node.style.removeProperty("outline");
  if (ev) {
    node.removeEventListener("pointerover", sendEventToMachine, true);
  }
};

/**
 * 
 * @param node : HTMLElement
 * 
 * Highlight a potential drop node with more ui feedback
 */
const highlightDrop = (node: HTMLElement) => {
  const blacklist = ["corejame-type", "span", "h1", "h2", "h3", "h4", "h5", "h6", "p"];
  if (!blacklist.includes(node.localName)) node.style.background = "var(--cj-colors-blue-300)";
};

/**
 * 
 * @param node : HTMLElement
 * 
 * Remove highlight from potential drop element.
 */
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
      _actions: []
    },
    states: {
      inactive: {
        id: "inactive",
        on: {
          build: { target: "active" },
          deployment: { target: "deployment" },
          pointerup: {
            target: "edit",
            cond: "validElement",
            actions: ["saveEditInstance"],
          },
        },
        entry: ["removeAllListeners"],
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
          reset: { target: "inactive" },
          deployment: { target: "deployment" },
          pointerdown: {
            target: "dragging",
            actions: ["onIdleToDragging"],
          },
        },
        entry: ["initBaseCanvas", "initDropzone"],
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
            entry: ["dragging"]
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
              inactive: {
                target: "outside",
                actions: [(context =>  context.possibleTargets.forEach((el) => removeHighlight(el), false))],
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
      deployment: {
        on: {
          reset: { target: "inactive" },
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

        const corejamElements = document.querySelectorAll("corejam-canvas .drop *");
        const rootDropzone = document.querySelector(".drop") as HTMLElement;

        rootDropzone.addEventListener("pointerover", (e: MouseEvent) => {
          sendEventToMachine(e);
        })

        rootDropzone.addEventListener("pointerout", () => {
          sendEventToMachine({type: "inactive"});
        })

        const possibleTargets = [rootDropzone];

        if (corejamElements.length > 0) {
          corejamElements.forEach((el: HTMLElement) => {
            if (el.localName.includes("corejam") && el !== target) possibleTargets.push(el);
          });
        } else {
          const dropzone = document.querySelector(".drop") as HTMLElement;
          possibleTargets.push(dropzone);
        }

        target.style.pointerEvents = "none";


        return {
          draggedElementInstance: target,
          px: event.clientX,
          py: event.clientY,
          possibleTargets,
        };
      }),
      onDraggingToIdle: assign((context: CanvasContext) => {
        // const dropNode = document.querySelector(".drop") as HTMLElement;
        // removeHighlight(dropNode);

        context.possibleTargets.forEach((el) => removeHighlight(el), true);
        context.draggedElementInstance.style.removeProperty("pointer-events");
        return {
          // draggedElementInstance: null,
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
        context.draggedElementInstance.style.removeProperty("transform");
        context.draggedElementInstance.style.removeProperty("pointer-events");
        if (dropNode.contains(context.draggedElementInstance)) {
          dropTarget.appendChild(context.draggedElementInstance);
          const evt = new CustomEvent("corejam:canvas:change");
          document.dispatchEvent(evt)
        } else {
          const node = createNewNode(context.draggedElementInstance);
          dropTarget.append(node);
          const evt = new CustomEvent("corejam:canvas:change");
          document.dispatchEvent(evt)
          return {
            _actions: [
              () => {node.remove();},
              ...context._actions
            ]
          }
        }
       
      }),
      unsetDrop: (context) => {
        context.possibleTargets.forEach((el) => removeHighlightDrop(el));
      },
      showEdit: (context) => {
        const node = document.createElement("corejam-edit");
        //@ts-ignore
        node.node = context.editInstance;
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

export const { state: canvasState, set: setCanvasState, onChange: onCanvasChange } = createStore<CanvasState>({
  machine: null,
});

//@ts-ignore
window.undo = () => {
  const fn  = canvasState.machine.context._actions.shift()
  fn();
}
export const canvasService = interpret(canvasMachine)
  .onTransition((state) => {
    if (!canvasState.machine) setCanvasState("machine", state);
    if (state.changed) {
      setCanvasState("machine", state);
      document.body.dataset.state = state.toStrings().join(" ");
        if (state.context.draggedElementInstance) state.context.draggedElementInstance.style.transform = `translate(
            ${state.context.dx}px,
            ${state.context.dy}px)`;
    }
  })
  .start();
