import { createMachine, assign, interpret } from "xstate";
// import { serialize } from "../../utils/utils";

type CanvasStateSchema =
  | {
      value: "idle";
      context: CanvasContext;
    }
  | {
      value: "dragging";
      context: CanvasContext;
    }
  | {
      value: "drop";
      context: CanvasContext;
    };

interface CanvasContext {
  draggedElementInstance?: any;
  draggedElementTag?: any;
  dx?: number;
  dy?: number;
  pointerx?: number;
  pointery?: number;
  possibleTarget?: any;
  allTargets?: any;
}

type CanvasEvent = any | MouseEvent;

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
};
// const removeHighlight = (node: HTMLElement) => node.style.removeProperty("background");

export const canvasMachine = createMachine<CanvasContext, CanvasEvent, CanvasStateSchema>(
  {
    id: "canvas",
    initial: "idle",
    context: {},
    states: {
      idle: {
        id: "idle",
        entry: assign({
          dx: 0,
          dy: 0,
          pointerx: 0,
          pointery: 0,
        }),
        on: {
          mousedown: {
            target: "dragging",
            actions: [
              assign({
                draggedElementInstance: (_c, e) => e.target,
                pointerx: (_context, event) => event.clientX,
                pointery: (_context, event) => event.clientY,
              }),
              () => {
                document.querySelectorAll(".drop").forEach((node: HTMLElement) => {
                  highlight(node);
                  node.addEventListener("mouseenter", (e) => {
                    console.log(e);
                    sendEventToMachine(e);
                  });
                  node.addEventListener("mouseout", sendEventToMachine);
                });
              },
            ],
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
                actions: ["removeEventListeners"],
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
            actions: assign({
              dx: (context, event) => event.clientX - context.pointerx,
              dy: (context, event) => event.clientY - context.pointery,
            }),
          },
        },
      },
      dropped: {
        id: "dropped",
      },
    },
  },
  {
    actions: {},
  }
);

export const canvasService = interpret(canvasMachine)
  .onTransition((state) => {
    if (state.changed) {
      console.log(state.context);
      document.body.dataset.state = state.toStrings().join(" ");
      if (state.context.draggedElementInstance) {
        state.context.draggedElementInstance.style.pointerEvents = "none";
        state.context.draggedElementInstance.style.transform = `translate(
            ${state.context.dx}px,
            ${state.context.dy}px)`;
      }
    }
  })
  .start();

document.body.addEventListener("mouseup", (event) => {
  sendEventToMachine(event);
});

document.body.addEventListener("mousemove", (event) => {
  sendEventToMachine(event);
});
