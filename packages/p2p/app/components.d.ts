/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
export namespace Components {
    interface DershopDuo {
    }
    interface DershopP2pCursor {
    }
    interface P2pApp {
    }
    interface RouteIndex {
    }
}
declare global {
    interface HTMLDershopDuoElement extends Components.DershopDuo, HTMLStencilElement {
    }
    var HTMLDershopDuoElement: {
        prototype: HTMLDershopDuoElement;
        new (): HTMLDershopDuoElement;
    };
    interface HTMLDershopP2pCursorElement extends Components.DershopP2pCursor, HTMLStencilElement {
    }
    var HTMLDershopP2pCursorElement: {
        prototype: HTMLDershopP2pCursorElement;
        new (): HTMLDershopP2pCursorElement;
    };
    interface HTMLP2pAppElement extends Components.P2pApp, HTMLStencilElement {
    }
    var HTMLP2pAppElement: {
        prototype: HTMLP2pAppElement;
        new (): HTMLP2pAppElement;
    };
    interface HTMLRouteIndexElement extends Components.RouteIndex, HTMLStencilElement {
    }
    var HTMLRouteIndexElement: {
        prototype: HTMLRouteIndexElement;
        new (): HTMLRouteIndexElement;
    };
    interface HTMLElementTagNameMap {
        "dershop-duo": HTMLDershopDuoElement;
        "dershop-p2p-cursor": HTMLDershopP2pCursorElement;
        "p2p-app": HTMLP2pAppElement;
        "route-index": HTMLRouteIndexElement;
    }
}
declare namespace LocalJSX {
    interface DershopDuo {
        "onDisconnectP2P"?: (event: CustomEvent<any>) => void;
        "onEstablishP2P"?: (event: CustomEvent<any>) => void;
    }
    interface DershopP2pCursor {
    }
    interface P2pApp {
    }
    interface RouteIndex {
    }
    interface IntrinsicElements {
        "dershop-duo": DershopDuo;
        "dershop-p2p-cursor": DershopP2pCursor;
        "p2p-app": P2pApp;
        "route-index": RouteIndex;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "dershop-duo": LocalJSX.DershopDuo & JSXBase.HTMLAttributes<HTMLDershopDuoElement>;
            "dershop-p2p-cursor": LocalJSX.DershopP2pCursor & JSXBase.HTMLAttributes<HTMLDershopP2pCursorElement>;
            "p2p-app": LocalJSX.P2pApp & JSXBase.HTMLAttributes<HTMLP2pAppElement>;
            "route-index": LocalJSX.RouteIndex & JSXBase.HTMLAttributes<HTMLRouteIndexElement>;
        }
    }
}
