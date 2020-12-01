import { createMachine, assign, interpret } from "xstate";
// import { serialize } from "../../utils/utils"

interface CanvasContext {
  draggedElementInstance: HTMLElement;
  dx: number;
  dy: number;
  px?: number;
  py?: number;
  possibleTargets: HTMLElement[];
  possibleTarget: HTMLElement;
  //allTargets?: any;
}

type CanvasStateSchema =
  | {
      value: "idle";
      context: CanvasContext & {
        draggedElementInstance: null;
        possibleTargets: null;
        possibleTarget: null;
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

const sendEventToMachine = (evt: MouseEvent) => canvasService.send(evt);

// const createNewNode = (tag: string) => {
//   const tagNode = document.createElement(tag);
//   tagNode.innerText = tagNode.localName;
//   tagNode.dataset["component"] = tag;
//   tagNode.dataset["inCanvas"] = "true";
//   tagNode.style.userSelect = "none";
//   tagNode.addEventListener("mousedown", (event) => canvasService.send(event));
//   return tagNode;
// };

const highlight = (node: HTMLElement) => {
  node.style.background = "var(--cj-colors-blue-100)";
  node.style.border = "1px solid black";
  node.addEventListener("mouseover", sendEventToMachine);
};
const removeHighlight = (node: HTMLElement, ev = true) => {
  node.style.removeProperty("background");
  node.style.removeProperty("border");
  if (ev) node.removeEventListener("mouseover", sendEventToMachine);
};

const highlightDrop = (node: HTMLElement) => {
  node.style.background = "var(--cj-colors-blue-300)";
};

const removeHighlightDrop = (node: HTMLElement) => {
  console.log("remove", node);
  node.style.background = "var(--cj-colors-blue-100)";
};
export const canvasMachine = createMachine<CanvasContext, MouseEvent, CanvasStateSchema>(
  {
    initial: "idle",
    context: {
      draggedElementInstance: null,
      possibleTargets: null,
      possibleTarget: null,
      dx: 0,
      dy: 0,
      px: 0,
      py: 0,
    },
    states: {
      idle: {
        id: "idle",
        on: {
          mousedown: {
            target: "dragging",
            actions: ["onIdleToDragging"],
          },
        },
      },
      dragging: {
        initial: "outside",
        states: {
          outside: {
            on: {
              mouseover: {
                target: "inside",
              },
              mouseup: {
                target: "#idle",
                actions: ["onDraggingToIdle"],
              },
              mouseout: {
                internal: true,
                actions: [
                  (context) => {
                    context.possibleTargets.forEach((el) => removeHighlight(el, false));
                  },
                ],
              },
            },
          },
          inside: {
            initial: "base",
            on: {
              mouseover: {
                internal: true,
                actions: ["highlightPossibleTarget"],
              },
              mouseup: {
                target: "#dropped",
              },
              mouseout: {
                target: "outside",
                actions: [
                  (context) => {
                    context.possibleTargets.forEach((el) => removeHighlight(el, false));
                  },
                ],
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
              base: {
                onEntry: (_content, event) => {},
              },

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
          mousemove: {
            internal: true,
            actions: ["mousemove"],
          },
        },
      },
      dropped: {
        id: "dropped",
      },
    },
  },
  {
    actions: {
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

        canvas.addEventListener("mouseout", sendEventToMachine);

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
        context.draggedElementInstance.style.transform = `translate(
          0px,
          0px)`;

        context.draggedElementInstance.style.pointerEvents = "initial";

        context.possibleTargets.forEach((el) => removeHighlight(el));

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
      highlightPossibleTarget: assign((context, event) => {
        if (context.possibleTarget) removeHighlightDrop(context.possibleTarget);
        const possibleTarget = event.target as HTMLElement;
        highlightDrop(possibleTarget);
        return {
          possibleTarget,
        };
      }),
      removeHighlightPossibleTarget: (_context, event) => {
        const possibleTarget = event.target as HTMLElement;
        removeHighlightDrop(possibleTarget);
      },
      mousemove: assign((context: CanvasContext, event: MouseEvent) => {
        return {
          dx: event.clientX - context.px,
          dy: event.clientY - context.py,
        };
      }),
    },
  }
);

export const canvasService = interpret(canvasMachine)
  .onTransition((state) => {
    if (state.changed) {
      document.body.dataset.state = state.toStrings().join(" ");
      if (state.matches("dragging"))
        state.context.draggedElementInstance.style.transform = `translate(
            ${state.context.dx}px,
            ${state.context.dy}px)`;
    }
  })
  .start();

document.body.addEventListener("mouseup", (event) => {
  sendEventToMachine(event);
});

document.body.addEventListener("mousemove", (event) => {
  sendEventToMachine(event);
});
