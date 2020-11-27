import { createMachine, assign, interpret } from "xstate";
// import { serialize } from "../../utils/utils"

interface CanvasContext {
  draggedElementInstance: HTMLElement;
  dx: number;
  dy: number;
  px?: number;
  py?: number;
  //possibleTarget?: any;
  //allTargets?: any;
}

type CanvasStateSchema =
  | {
      value: "idle";
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
  node.addEventListener("mouseenter", sendEventToMachine);
  node.addEventListener("mouseout", sendEventToMachine);
};
const removeHighlight = (node: HTMLElement) => {
  node.style.removeProperty("background");
  node.removeEventListener("mouseenter", sendEventToMachine);
  node.removeEventListener("mouseout", sendEventToMachine);
};

export const canvasMachine = createMachine<CanvasContext, MouseEvent, CanvasStateSchema>(
  {
    initial: "idle",
    context: {
      draggedElementInstance: null,
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
              mouseenter: {
                target: "inside",
                actions: ["assignPossibleTarget"],
              },
              mouseup: {
                target: "#idle",
                actions: ["onDraggingToIdle"],
              },
            },
          },
          inside: {
            onEntry: ["highlightPossibleTarget"],
            initial: "base",
            on: {
              mouseout: {
                target: "outside",
                actions: ["removeHighlightPossibleTarget"],
              },
              mouseup: {
                target: "#dropped",
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
                onEntry: (_content, event) => {
                  console.log(event.target);
                },
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

        document.querySelectorAll(".drop").forEach(highlight);

        target.style.pointerEvents = "none";

        return {
          draggedElementInstance: target,
          px: event.clientX,
          py: event.clientY,
        };
      }),
      onDraggingToIdle: assign((context: CanvasContext) => {
        document.querySelectorAll(".drop").forEach(removeHighlight);
        context.draggedElementInstance.style.transform = `translate(
          0px,
          0px)`;

        context.draggedElementInstance.style.pointerEvents = "initial";

        return {
          draggedElementInstance: null,
          dx: 0,
          dy: 0,
          px: 0,
          py: 0,
        };
      }),

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
