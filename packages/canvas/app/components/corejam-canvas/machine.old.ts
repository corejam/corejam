import { createMachine, assign, interpret } from "xstate";
import { serialize } from "../../utils/utils";

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

const createNewNode = (tag: string) => {
  const tagNode = document.createElement(tag);
  tagNode.innerText = tagNode.localName;
  tagNode.dataset["component"] = tag;
  tagNode.dataset["inCanvas"] = "true";
  tagNode.style.userSelect = "none";
  tagNode.addEventListener("mousedown", (event) => canvasService.send(event));
  return tagNode;
};

const highlight = (node: HTMLElement) => {
  node.style.background = "var(--cj-colors-blue-100)";
};
const removeHighlight = (node: HTMLElement) => node.style.removeProperty("background");

export const canvasMachine = createMachine<CanvasContext, CanvasEvent, CanvasStateSchema>(
  {
    id: "canvas",
    initial: "idle",
    context: {},
    states: {
      idle: {
        id: "idle",
        on: {
          mousedown: {
            target: "dragging",
            actions: ["initStartValues", "bootstrapEventListeners"],
          },
        },
        entry: [() => document.querySelectorAll("#dummy")?.forEach((n) => n.remove())],
      },
      dragging: {
        initial: "outside",
        states: {
          outside: {
            on: {
              mouseover: {
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
            actions: ["saveMouseMovement", "showSnaper"],
          },
        },
      },
      dropped: {
        id: "dropped",
        after: {
          1000: {
            target: "idle",
            actions: ["removeEventListeners"],
          },
        },
        onEntry: ["appendItem", () => serialize()],
      },
    },
  },
  {
    actions: {
      resetValues: assign({
        allTargets: [],
        dx: 0,
        dy: 0,
        pointerx: 0,
        pointery: 0,
        draggedElementInstance: null,
        draggedElementTag: null,
        possibleTarget: null,
      }),
      initStartValues: assign({
        pointerx: (_, event) => event.clientX,
        pointery: (_context, event) => event.clientY,
        draggedElementInstance: (_, event: any) => {
          const node = document.createElement(event.target.dataset.component);
          node.id = "dummy";
          node.style.visibility = "hidden";
          document.body.appendChild(node);
          return node;
        },
        draggedElementTag: (_, event: any) => event.target.dataset.component,
        allTargets: (_, _event) => [document.querySelector("corejam-box.drop")],
      }),
      bootstrapEventListeners: (context) => {
        context.allTargets.forEach((node) => {
          highlight(node);
          node.addEventListener("mouseover", sendEventToMachine);
          node.addEventListener("mouseout", sendEventToMachine);
        });
        document.body.addEventListener("mousemove", sendEventToMachine);
        document.body.addEventListener("mouseup", sendEventToMachine);
      },
      // bootstrapEventListeners: assign({
      //   allTargets: (context) => {
      //     const targets = [];
      //     const traverse = (node) => {
      //       if (context.draggedElementInstance.droppableElements.includes(node.localName)) {
      //         targets.push(node);
      //         highlight(node);
      //         node.addEventListener("mouseover", sendEventToMachine);
      //         node.addEventListener("mouseout", sendEventToMachine);
      //       }
      //       if (node.children) Array.from(node.children).forEach((node) => traverse(node));
      //     };
      //     const rootNode = document.querySelector("corejam-box.drop") as HTMLElement;

      //     targets.push(rootNode);
      //     highlight(rootNode);
      //     rootNode.addEventListener("mouseover", sendEventToMachine);
      //     rootNode.addEventListener("mouseout", sendEventToMachine);
      //     Array.from(rootNode.children).map((node) => traverse(node));
      //     document.body.addEventListener("mousemove", sendEventToMachine);
      //     document.body.addEventListener("mouseup", sendEventToMachine);
      //     return targets;
      //   },
      // }),
      removeEventListeners: assign({
        allTargets: (context) => {
          //@ts-ignore
          context.allTargets.forEach((node) => {
            node.removeEventListener("mouseover", sendEventToMachine);
            node.removeEventListener("mouseout", sendEventToMachine);
            removeHighlight(node);
          });

          document.body.removeEventListener("mousemove", sendEventToMachine);
          document.body.removeEventListener("mouseup", sendEventToMachine);
          return [];
        },
        dx: 0,
        dy: 0,
        pointerx: 0,
        pointery: 0,
        draggedElementInstance: null,
        draggedElementTag: null,
        possibleTarget: null,
      }),
      markDrop: (_, event) => {
        (<HTMLElement>event.target).style.background = "var(--cj-colors-blue-400)";
        setTimeout(() => {
          (<HTMLElement>event.target).style.removeProperty("background");
        }, 500);
      },
      appendItem: (context, event) => {
        console.log(event.target);
        const newNode = createNewNode(context.draggedElementTag);
        const placement =
          //@ts-ignore
          canvasService.state.historyValue.states.dragging.current.inside;

        if (placement === "left") {
          context.possibleTarget.before(newNode);
        } else if (placement === "right") {
          context.possibleTarget.after(newNode);
        } else {
          context.possibleTarget.appendChild(newNode);
        }
      },
      assignPossibleTarget: assign({
        possibleTarget: (_cts, evt) => evt.target,
      }),
      highlightPossibleTarget: (context, event) => {
        if (context.allTargets.length === 1 && event.target?.localName === "corejam-box") {
          // context.possibleTarget.style.outlineStyle = "solid";
          console.log(context.possibleTarget);
        }
        if (context.draggedElementInstance.droppableElements.includes(event.target?.localName))
          // context.possibleTarget.style.outlineStyle = "solid";
          console.log(context.possibleTarget);
      },
      removeHighlightPossibleTarget: (context, event) => {
        if (context.draggedElementInstance.droppableElements.includes(event.target?.localName)) {
          console.log(context.possibleTarget);
        }
        // context.possibleTarget.style.outlineStyle = "dashed";
      },
      saveMouseMovement: assign({
        dx: (context, event: MouseEvent) => event.clientX - context.pointerx,
        dy: (context, event: MouseEvent) => event.clientY - context.pointery,
      }),
      showSnaper: (context, event: MouseEvent) => {
        if (context.possibleTarget) {
          const paddingWidth = 30;
          const cords = context.possibleTarget.getBoundingClientRect();
          const inLeftBoundary = event.clientX >= cords.x && event.clientX < cords.x + paddingWidth;
          const inRightBoundary =
            event.clientX <= cords.x + cords.width && event.clientX >= cords.x + cords.width - paddingWidth;
          if (inRightBoundary) {
            canvasService.send({ type: "inside.right" });
          } else if (inLeftBoundary) {
            canvasService.send({ type: "inside.left" });
          } else {
            canvasService.send({ type: "inside.base" });
          }
        }
      },
      showRight: (context, _event) => {
        context.possibleTarget.style.borderRight = "5px solid blue";
      },
    },
  }
);

export const canvasService = interpret(canvasMachine)
  .onTransition((state) => {
    if (state.changed) {
      console.log(state.context);
      document.body.dataset.state = state.toStrings().join(" ");
      if (state.context.draggedElementInstance) {
        state.context.draggedElementInstance.style.transform = `translate(
            ${state.context.dx}px,
            ${state.context.dy}px)`;
      }
    }
  })
  .start();
