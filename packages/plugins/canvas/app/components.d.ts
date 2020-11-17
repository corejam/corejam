/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
export namespace Components {
    interface DershopCanvas {
        "addDragger": (newDragger: string) => Promise<void>;
        "canvas": any;
        "canvasId": string;
        "draggers": string | string[];
        "editMode": boolean;
    }
    interface DershopCanvasDragger {
        "canvas": string;
        "tag": string;
    }
    interface DershopEditable {
    }
    interface DershopSerializer {
    }
    interface RouteIndex {
    }
}
declare global {
    interface HTMLDershopCanvasElement extends Components.DershopCanvas, HTMLStencilElement {
    }
    var HTMLDershopCanvasElement: {
        prototype: HTMLDershopCanvasElement;
        new (): HTMLDershopCanvasElement;
    };
    interface HTMLDershopCanvasDraggerElement extends Components.DershopCanvasDragger, HTMLStencilElement {
    }
    var HTMLDershopCanvasDraggerElement: {
        prototype: HTMLDershopCanvasDraggerElement;
        new (): HTMLDershopCanvasDraggerElement;
    };
    interface HTMLDershopEditableElement extends Components.DershopEditable, HTMLStencilElement {
    }
    var HTMLDershopEditableElement: {
        prototype: HTMLDershopEditableElement;
        new (): HTMLDershopEditableElement;
    };
    interface HTMLDershopSerializerElement extends Components.DershopSerializer, HTMLStencilElement {
    }
    var HTMLDershopSerializerElement: {
        prototype: HTMLDershopSerializerElement;
        new (): HTMLDershopSerializerElement;
    };
    interface HTMLRouteIndexElement extends Components.RouteIndex, HTMLStencilElement {
    }
    var HTMLRouteIndexElement: {
        prototype: HTMLRouteIndexElement;
        new (): HTMLRouteIndexElement;
    };
    interface HTMLElementTagNameMap {
        "dershop-canvas": HTMLDershopCanvasElement;
        "dershop-canvas-dragger": HTMLDershopCanvasDraggerElement;
        "dershop-editable": HTMLDershopEditableElement;
        "dershop-serializer": HTMLDershopSerializerElement;
        "route-index": HTMLRouteIndexElement;
    }
}
declare namespace LocalJSX {
    interface DershopCanvas {
        "canvas"?: any;
        "canvasId"?: string;
        "draggers"?: string | string[];
        "editMode"?: boolean;
        "onP2pSendData"?: (event: CustomEvent<any>) => void;
    }
    interface DershopCanvasDragger {
        "canvas"?: string;
        "tag"?: string;
    }
    interface DershopEditable {
    }
    interface DershopSerializer {
    }
    interface RouteIndex {
    }
    interface IntrinsicElements {
        "dershop-canvas": DershopCanvas;
        "dershop-canvas-dragger": DershopCanvasDragger;
        "dershop-editable": DershopEditable;
        "dershop-serializer": DershopSerializer;
        "route-index": RouteIndex;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "dershop-canvas": LocalJSX.DershopCanvas & JSXBase.HTMLAttributes<HTMLDershopCanvasElement>;
            "dershop-canvas-dragger": LocalJSX.DershopCanvasDragger & JSXBase.HTMLAttributes<HTMLDershopCanvasDraggerElement>;
            "dershop-editable": LocalJSX.DershopEditable & JSXBase.HTMLAttributes<HTMLDershopEditableElement>;
            "dershop-serializer": LocalJSX.DershopSerializer & JSXBase.HTMLAttributes<HTMLDershopSerializerElement>;
            "route-index": LocalJSX.RouteIndex & JSXBase.HTMLAttributes<HTMLRouteIndexElement>;
        }
    }
}
