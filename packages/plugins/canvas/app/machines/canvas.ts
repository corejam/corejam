import { createMachine, assign, interpret } from "xstate";
import { serialize } from "../utils/utils";

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
  draggedElement?: any;
  draggedTag?: any;
  dx?: number;
  dy?: number;
  pointerx?: number;
  pointery?: number;
  canvasId?: string;
  possibleTarget?: any;
  allTargets?: any;
  realEl?: HTMLElement & {
    droppableElements?: [any];
  };
}

type CanvasEvent = any | MouseEvent;

const sendEventToMachine = (evt: MouseEvent) => canvasService.send(evt);

const createNewNode = (tag: string) => {
  const tagNode = document.createElement(tag);
  tagNode.innerText = tagNode.localName;
  tagNode.addEventListener("mousedown", (event) => canvasService.send(event));
  return tagNode;
};

const getPath = (event: any) => event.path || (event.composedPath && event.composedPath());

const highlight = (node: HTMLElement) => {
  node.style.outline = "1px dashed red";
};
const removeHighlight = (node: HTMLElement) => node.style.removeProperty("outline");

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
        entry: ["resetValues"],
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
                onEntry: (c) => {
                  c.possibleTarget.style.borderRight = "";
                  c.possibleTarget.style.borderLeft = "";
                },
              },

              right: {
                onEntry: (c) => (c.possibleTarget.style.borderRight = "5px solid gold"),
                onExit: (c) => (c.possibleTarget.style.borderRight = ""),
              },
              left: {
                onEntry: (c) => (c.possibleTarget.style.borderLeft = "5px solid gold"),
                onExit: (c) => (c.possibleTarget.style.borderLeft = ""),
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
          1000: "idle",
        },
        onEntry: ["appendItem", () => serialize()],
        onExit: ["removeEventListeners"],
      },
    },
  },
  {
    actions: {
      resetValues: assign({
        dx: 0,
        dy: 0,
        pointerx: 0,
        pointery: 0,
        possibleTarget: null,
        realEl: null,
      }),
      initStartValues: assign({
        pointerx: (_, event) => event.clientX,
        pointery: (_context, event) => event.clientY,
        draggedElement: (_, event: any) => <HTMLElement>getPath(event)[1],
        draggedTag: (_, event: any) => <HTMLElement>getPath(event)[1].dataset.tag,
        canvasId: (_, event: any) => getPath(event)[1].dataset.canvas,
        realEl: (_, event) => {
          //@ts-ignore
          console.log(event.target.previousSibling);
          return (<HTMLElement>event.target).previousSibling as HTMLElement;
        },
      }),
      bootstrapEventListeners: assign({
        allTargets: (context) => {
          if (window.innerHeight > document.body.clientHeight) document.body.style.minHeight = "100vh";
          const targets = [];
          console.log(context);
          const traverse = (node, context, targets) => {
            console.log("waaa", context.realEl.droppableElements);
            if (context.realEl.droppableElements.includes(node.localName)) {
              targets.push(node);
              highlight(node);
              node.addEventListener("mouseover", sendEventToMachine);
              node.addEventListener("mouseout", sendEventToMachine);
            }
            if (node.children) Array.from(node.children).forEach((node) => traverse(node, context, targets));
          };
          const rootNode = document.querySelector("dershop-canvas").querySelector(".drop") as HTMLElement;

          if (rootNode.innerText === "No content") {
            targets.push(rootNode);
            highlight(rootNode);
            rootNode.addEventListener("mouseover", sendEventToMachine);
            rootNode.addEventListener("mouseout", sendEventToMachine);
          } else {
            Array.from(rootNode.children).map((node) => traverse(node, context, targets));
          }
          document.body.addEventListener("mousemove", sendEventToMachine);
          document.body.addEventListener("mouseup", sendEventToMachine);
          return targets;
        },
      }),
      removeEventListeners: (context, _event) => {
        context.allTargets.forEach((node) => {
          node.removeEventListener("mouseover", sendEventToMachine);
          node.removeEventListener("mouseout", sendEventToMachine);
          removeHighlight(node);
        });

        document.body.removeEventListener("mousemove", sendEventToMachine);
        document.body.addEventListener("mouseup", sendEventToMachine);
      },
      markDrop: (_, event) => {
        (<HTMLElement>event.target).style.background = "red";
        setTimeout(() => {
          (<HTMLElement>event.target).style.removeProperty("background");
        }, 500);
      },
      appendItem: (context, _event) => {
        const newNode = createNewNode(context.draggedTag);
        const placement =
          //@ts-ignore
          canvasService.state.historyValue.states.dragging.current.inside;

        context.possibleTarget.style.borderRight = "none";
        if (context.possibleTarget.innerText === "No content") {
          context.possibleTarget.innerText = "";
        }
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
        if (context.allTargets.length === 1 && event.target?.localName === "div") {
          context.possibleTarget.style.outlineStyle = "solid";
        }
        if (context.realEl.droppableElements.includes(event.target?.localName))
          context.possibleTarget.style.outlineStyle = "solid";
      },
      removeHighlightPossibleTarget: (context, event) => {
        if (context.realEl.droppableElements.includes(event.target?.localName))
          context.possibleTarget.style.outlineStyle = "dashed";
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
      const node = document.querySelector("dershop-canvas");
      node
        .querySelectorAll("dershop-canvas-dragger")
        //@ts-ignore
        .forEach((el) => (el.dataset.state = state.toStrings().join(" ")));
      document.body.dataset.state = state.toStrings().join(" ");
      if (state.context.draggedElement) {
        state.context.draggedElement.style.transform = `translate(
            ${state.context.dx}px,
            ${state.context.dy}px)`;
      }
    }
  })
  .start();
