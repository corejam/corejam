/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
import { objectFit } from "./components/dershop-image/dershop-image";
import { ManufacturerDB } from "../shared/types/Manufacturer";
import { Product } from "../shared/types/Product";
import { SEO } from "@corejam/base/dist/typings/Seo";
import { Sidebar } from "../shared/types/Sidebar";
export namespace Components {
    interface DershopAccount {
    }
    interface DershopAdminOrderList {
        "data": any;
        "page": number;
    }
    interface DershopBrands {
    }
    interface DershopCart {
    }
    interface DershopCartMini {
    }
    interface DershopFooter {
    }
    interface DershopFormRegister {
    }
    interface DershopHeader {
        "cartLink": string;
        "mainLinks": string | any;
        "maxScreen": string;
        "secondaryLinks": string | any;
        "xAlign": string;
    }
    interface DershopIconsCart {
    }
    interface DershopIconsMenu {
    }
    interface DershopIconsSpotlight {
    }
    interface DershopImage {
        "alt": string;
        "fit": objectFit;
        "h": string;
        "src": string;
    }
    interface DershopLayout {
    }
    interface DershopLogo {
    }
    interface DershopManufacturer {
        "manufacturer": ManufacturerDB;
    }
    interface DershopManufacturerList {
    }
    interface DershopOrderView {
        "orderId": string;
    }
    interface DershopProduct {
        /**
          * Product Description
         */
        "description": string;
        "droppableElements": string[];
        /**
          * Images provided to enhance the product as a slideshow. Provided either through comma separated string or as an array of strings.
         */
        "images": string | [];
        /**
          * Image to be used for main hero image of the product.
         */
        "mainImage": string;
        /**
          * Main Product Name
         */
        "name": string;
        /**
          * Already formatted price as string with currency symbol
         */
        "price": number;
        "product": string | Product;
        "url": string;
    }
    interface DershopProductBox {
        "getDroppableElements": () => Promise<string[]>;
        "image"?: string;
        "name": string;
        "price"?: number;
        "url": string;
    }
    interface DershopProductList {
        "default": boolean;
        "list": any;
        "page": Number;
        "size": Number;
    }
    interface DershopRouteAccount {
    }
    interface DershopRouteAdminOrderView {
        "param": any;
    }
    interface DershopRouteAdminOrders {
        "param": any;
    }
    interface DershopRouteCart {
    }
    interface DershopRouteIndex {
    }
    interface DershopRouteLogin {
    }
    interface DershopRouteProducts {
    }
    interface DershopRouteRegister {
    }
    interface DershopSeo {
        "seo": SEO;
    }
    interface DershopSidebar {
        "sidebar": Sidebar;
    }
    interface DershopSpotlight {
    }
    interface DershopTestimonial {
        "heading": string;
        "text": string;
    }
    interface DershopUrl {
        "param": any;
    }
}
declare global {
    interface HTMLDershopAccountElement extends Components.DershopAccount, HTMLStencilElement {
    }
    var HTMLDershopAccountElement: {
        prototype: HTMLDershopAccountElement;
        new (): HTMLDershopAccountElement;
    };
    interface HTMLDershopAdminOrderListElement extends Components.DershopAdminOrderList, HTMLStencilElement {
    }
    var HTMLDershopAdminOrderListElement: {
        prototype: HTMLDershopAdminOrderListElement;
        new (): HTMLDershopAdminOrderListElement;
    };
    interface HTMLDershopBrandsElement extends Components.DershopBrands, HTMLStencilElement {
    }
    var HTMLDershopBrandsElement: {
        prototype: HTMLDershopBrandsElement;
        new (): HTMLDershopBrandsElement;
    };
    interface HTMLDershopCartElement extends Components.DershopCart, HTMLStencilElement {
    }
    var HTMLDershopCartElement: {
        prototype: HTMLDershopCartElement;
        new (): HTMLDershopCartElement;
    };
    interface HTMLDershopCartMiniElement extends Components.DershopCartMini, HTMLStencilElement {
    }
    var HTMLDershopCartMiniElement: {
        prototype: HTMLDershopCartMiniElement;
        new (): HTMLDershopCartMiniElement;
    };
    interface HTMLDershopFooterElement extends Components.DershopFooter, HTMLStencilElement {
    }
    var HTMLDershopFooterElement: {
        prototype: HTMLDershopFooterElement;
        new (): HTMLDershopFooterElement;
    };
    interface HTMLDershopFormRegisterElement extends Components.DershopFormRegister, HTMLStencilElement {
    }
    var HTMLDershopFormRegisterElement: {
        prototype: HTMLDershopFormRegisterElement;
        new (): HTMLDershopFormRegisterElement;
    };
    interface HTMLDershopHeaderElement extends Components.DershopHeader, HTMLStencilElement {
    }
    var HTMLDershopHeaderElement: {
        prototype: HTMLDershopHeaderElement;
        new (): HTMLDershopHeaderElement;
    };
    interface HTMLDershopIconsCartElement extends Components.DershopIconsCart, HTMLStencilElement {
    }
    var HTMLDershopIconsCartElement: {
        prototype: HTMLDershopIconsCartElement;
        new (): HTMLDershopIconsCartElement;
    };
    interface HTMLDershopIconsMenuElement extends Components.DershopIconsMenu, HTMLStencilElement {
    }
    var HTMLDershopIconsMenuElement: {
        prototype: HTMLDershopIconsMenuElement;
        new (): HTMLDershopIconsMenuElement;
    };
    interface HTMLDershopIconsSpotlightElement extends Components.DershopIconsSpotlight, HTMLStencilElement {
    }
    var HTMLDershopIconsSpotlightElement: {
        prototype: HTMLDershopIconsSpotlightElement;
        new (): HTMLDershopIconsSpotlightElement;
    };
    interface HTMLDershopImageElement extends Components.DershopImage, HTMLStencilElement {
    }
    var HTMLDershopImageElement: {
        prototype: HTMLDershopImageElement;
        new (): HTMLDershopImageElement;
    };
    interface HTMLDershopLayoutElement extends Components.DershopLayout, HTMLStencilElement {
    }
    var HTMLDershopLayoutElement: {
        prototype: HTMLDershopLayoutElement;
        new (): HTMLDershopLayoutElement;
    };
    interface HTMLDershopLogoElement extends Components.DershopLogo, HTMLStencilElement {
    }
    var HTMLDershopLogoElement: {
        prototype: HTMLDershopLogoElement;
        new (): HTMLDershopLogoElement;
    };
    interface HTMLDershopManufacturerElement extends Components.DershopManufacturer, HTMLStencilElement {
    }
    var HTMLDershopManufacturerElement: {
        prototype: HTMLDershopManufacturerElement;
        new (): HTMLDershopManufacturerElement;
    };
    interface HTMLDershopManufacturerListElement extends Components.DershopManufacturerList, HTMLStencilElement {
    }
    var HTMLDershopManufacturerListElement: {
        prototype: HTMLDershopManufacturerListElement;
        new (): HTMLDershopManufacturerListElement;
    };
    interface HTMLDershopOrderViewElement extends Components.DershopOrderView, HTMLStencilElement {
    }
    var HTMLDershopOrderViewElement: {
        prototype: HTMLDershopOrderViewElement;
        new (): HTMLDershopOrderViewElement;
    };
    interface HTMLDershopProductElement extends Components.DershopProduct, HTMLStencilElement {
    }
    var HTMLDershopProductElement: {
        prototype: HTMLDershopProductElement;
        new (): HTMLDershopProductElement;
    };
    interface HTMLDershopProductBoxElement extends Components.DershopProductBox, HTMLStencilElement {
    }
    var HTMLDershopProductBoxElement: {
        prototype: HTMLDershopProductBoxElement;
        new (): HTMLDershopProductBoxElement;
    };
    interface HTMLDershopProductListElement extends Components.DershopProductList, HTMLStencilElement {
    }
    var HTMLDershopProductListElement: {
        prototype: HTMLDershopProductListElement;
        new (): HTMLDershopProductListElement;
    };
    interface HTMLDershopRouteAccountElement extends Components.DershopRouteAccount, HTMLStencilElement {
    }
    var HTMLDershopRouteAccountElement: {
        prototype: HTMLDershopRouteAccountElement;
        new (): HTMLDershopRouteAccountElement;
    };
    interface HTMLDershopRouteAdminOrderViewElement extends Components.DershopRouteAdminOrderView, HTMLStencilElement {
    }
    var HTMLDershopRouteAdminOrderViewElement: {
        prototype: HTMLDershopRouteAdminOrderViewElement;
        new (): HTMLDershopRouteAdminOrderViewElement;
    };
    interface HTMLDershopRouteAdminOrdersElement extends Components.DershopRouteAdminOrders, HTMLStencilElement {
    }
    var HTMLDershopRouteAdminOrdersElement: {
        prototype: HTMLDershopRouteAdminOrdersElement;
        new (): HTMLDershopRouteAdminOrdersElement;
    };
    interface HTMLDershopRouteCartElement extends Components.DershopRouteCart, HTMLStencilElement {
    }
    var HTMLDershopRouteCartElement: {
        prototype: HTMLDershopRouteCartElement;
        new (): HTMLDershopRouteCartElement;
    };
    interface HTMLDershopRouteIndexElement extends Components.DershopRouteIndex, HTMLStencilElement {
    }
    var HTMLDershopRouteIndexElement: {
        prototype: HTMLDershopRouteIndexElement;
        new (): HTMLDershopRouteIndexElement;
    };
    interface HTMLDershopRouteLoginElement extends Components.DershopRouteLogin, HTMLStencilElement {
    }
    var HTMLDershopRouteLoginElement: {
        prototype: HTMLDershopRouteLoginElement;
        new (): HTMLDershopRouteLoginElement;
    };
    interface HTMLDershopRouteProductsElement extends Components.DershopRouteProducts, HTMLStencilElement {
    }
    var HTMLDershopRouteProductsElement: {
        prototype: HTMLDershopRouteProductsElement;
        new (): HTMLDershopRouteProductsElement;
    };
    interface HTMLDershopRouteRegisterElement extends Components.DershopRouteRegister, HTMLStencilElement {
    }
    var HTMLDershopRouteRegisterElement: {
        prototype: HTMLDershopRouteRegisterElement;
        new (): HTMLDershopRouteRegisterElement;
    };
    interface HTMLDershopSeoElement extends Components.DershopSeo, HTMLStencilElement {
    }
    var HTMLDershopSeoElement: {
        prototype: HTMLDershopSeoElement;
        new (): HTMLDershopSeoElement;
    };
    interface HTMLDershopSidebarElement extends Components.DershopSidebar, HTMLStencilElement {
    }
    var HTMLDershopSidebarElement: {
        prototype: HTMLDershopSidebarElement;
        new (): HTMLDershopSidebarElement;
    };
    interface HTMLDershopSpotlightElement extends Components.DershopSpotlight, HTMLStencilElement {
    }
    var HTMLDershopSpotlightElement: {
        prototype: HTMLDershopSpotlightElement;
        new (): HTMLDershopSpotlightElement;
    };
    interface HTMLDershopTestimonialElement extends Components.DershopTestimonial, HTMLStencilElement {
    }
    var HTMLDershopTestimonialElement: {
        prototype: HTMLDershopTestimonialElement;
        new (): HTMLDershopTestimonialElement;
    };
    interface HTMLDershopUrlElement extends Components.DershopUrl, HTMLStencilElement {
    }
    var HTMLDershopUrlElement: {
        prototype: HTMLDershopUrlElement;
        new (): HTMLDershopUrlElement;
    };
    interface HTMLElementTagNameMap {
        "dershop-account": HTMLDershopAccountElement;
        "dershop-admin-order-list": HTMLDershopAdminOrderListElement;
        "dershop-brands": HTMLDershopBrandsElement;
        "dershop-cart": HTMLDershopCartElement;
        "dershop-cart-mini": HTMLDershopCartMiniElement;
        "dershop-footer": HTMLDershopFooterElement;
        "dershop-form-register": HTMLDershopFormRegisterElement;
        "dershop-header": HTMLDershopHeaderElement;
        "dershop-icons-cart": HTMLDershopIconsCartElement;
        "dershop-icons-menu": HTMLDershopIconsMenuElement;
        "dershop-icons-spotlight": HTMLDershopIconsSpotlightElement;
        "dershop-image": HTMLDershopImageElement;
        "dershop-layout": HTMLDershopLayoutElement;
        "dershop-logo": HTMLDershopLogoElement;
        "dershop-manufacturer": HTMLDershopManufacturerElement;
        "dershop-manufacturer-list": HTMLDershopManufacturerListElement;
        "dershop-order-view": HTMLDershopOrderViewElement;
        "dershop-product": HTMLDershopProductElement;
        "dershop-product-box": HTMLDershopProductBoxElement;
        "dershop-product-list": HTMLDershopProductListElement;
        "dershop-route-account": HTMLDershopRouteAccountElement;
        "dershop-route-admin-order-view": HTMLDershopRouteAdminOrderViewElement;
        "dershop-route-admin-orders": HTMLDershopRouteAdminOrdersElement;
        "dershop-route-cart": HTMLDershopRouteCartElement;
        "dershop-route-index": HTMLDershopRouteIndexElement;
        "dershop-route-login": HTMLDershopRouteLoginElement;
        "dershop-route-products": HTMLDershopRouteProductsElement;
        "dershop-route-register": HTMLDershopRouteRegisterElement;
        "dershop-seo": HTMLDershopSeoElement;
        "dershop-sidebar": HTMLDershopSidebarElement;
        "dershop-spotlight": HTMLDershopSpotlightElement;
        "dershop-testimonial": HTMLDershopTestimonialElement;
        "dershop-url": HTMLDershopUrlElement;
    }
}
declare namespace LocalJSX {
    interface DershopAccount {
    }
    interface DershopAdminOrderList {
        "data"?: any;
        "page"?: number;
    }
    interface DershopBrands {
    }
    interface DershopCart {
    }
    interface DershopCartMini {
    }
    interface DershopFooter {
    }
    interface DershopFormRegister {
    }
    interface DershopHeader {
        "cartLink"?: string;
        "mainLinks"?: string | any;
        "maxScreen"?: string;
        "secondaryLinks"?: string | any;
        "xAlign"?: string;
    }
    interface DershopIconsCart {
    }
    interface DershopIconsMenu {
    }
    interface DershopIconsSpotlight {
    }
    interface DershopImage {
        "alt"?: string;
        "fit"?: objectFit;
        "h"?: string;
        "src"?: string;
    }
    interface DershopLayout {
    }
    interface DershopLogo {
    }
    interface DershopManufacturer {
        "manufacturer"?: ManufacturerDB;
    }
    interface DershopManufacturerList {
    }
    interface DershopOrderView {
        "orderId"?: string;
    }
    interface DershopProduct {
        /**
          * Product Description
         */
        "description"?: string;
        "droppableElements"?: string[];
        /**
          * Images provided to enhance the product as a slideshow. Provided either through comma separated string or as an array of strings.
         */
        "images"?: string | [];
        /**
          * Image to be used for main hero image of the product.
         */
        "mainImage"?: string;
        /**
          * Main Product Name
         */
        "name"?: string;
        "onProductAddedToCart"?: (event: CustomEvent<any>) => void;
        /**
          * Already formatted price as string with currency symbol
         */
        "price"?: number;
        "product"?: string | Product;
        "url"?: string;
    }
    interface DershopProductBox {
        "image"?: string;
        "name"?: string;
        "price"?: number;
        "url"?: string;
    }
    interface DershopProductList {
        "default"?: boolean;
        "list"?: any;
        "page"?: Number;
        "size"?: Number;
    }
    interface DershopRouteAccount {
    }
    interface DershopRouteAdminOrderView {
        "param"?: any;
    }
    interface DershopRouteAdminOrders {
        "param"?: any;
    }
    interface DershopRouteCart {
    }
    interface DershopRouteIndex {
    }
    interface DershopRouteLogin {
    }
    interface DershopRouteProducts {
    }
    interface DershopRouteRegister {
    }
    interface DershopSeo {
        "seo"?: SEO;
    }
    interface DershopSidebar {
        "sidebar"?: Sidebar;
    }
    interface DershopSpotlight {
    }
    interface DershopTestimonial {
        "heading"?: string;
        "text"?: string;
    }
    interface DershopUrl {
        "param"?: any;
    }
    interface IntrinsicElements {
        "dershop-account": DershopAccount;
        "dershop-admin-order-list": DershopAdminOrderList;
        "dershop-brands": DershopBrands;
        "dershop-cart": DershopCart;
        "dershop-cart-mini": DershopCartMini;
        "dershop-footer": DershopFooter;
        "dershop-form-register": DershopFormRegister;
        "dershop-header": DershopHeader;
        "dershop-icons-cart": DershopIconsCart;
        "dershop-icons-menu": DershopIconsMenu;
        "dershop-icons-spotlight": DershopIconsSpotlight;
        "dershop-image": DershopImage;
        "dershop-layout": DershopLayout;
        "dershop-logo": DershopLogo;
        "dershop-manufacturer": DershopManufacturer;
        "dershop-manufacturer-list": DershopManufacturerList;
        "dershop-order-view": DershopOrderView;
        "dershop-product": DershopProduct;
        "dershop-product-box": DershopProductBox;
        "dershop-product-list": DershopProductList;
        "dershop-route-account": DershopRouteAccount;
        "dershop-route-admin-order-view": DershopRouteAdminOrderView;
        "dershop-route-admin-orders": DershopRouteAdminOrders;
        "dershop-route-cart": DershopRouteCart;
        "dershop-route-index": DershopRouteIndex;
        "dershop-route-login": DershopRouteLogin;
        "dershop-route-products": DershopRouteProducts;
        "dershop-route-register": DershopRouteRegister;
        "dershop-seo": DershopSeo;
        "dershop-sidebar": DershopSidebar;
        "dershop-spotlight": DershopSpotlight;
        "dershop-testimonial": DershopTestimonial;
        "dershop-url": DershopUrl;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "dershop-account": LocalJSX.DershopAccount & JSXBase.HTMLAttributes<HTMLDershopAccountElement>;
            "dershop-admin-order-list": LocalJSX.DershopAdminOrderList & JSXBase.HTMLAttributes<HTMLDershopAdminOrderListElement>;
            "dershop-brands": LocalJSX.DershopBrands & JSXBase.HTMLAttributes<HTMLDershopBrandsElement>;
            "dershop-cart": LocalJSX.DershopCart & JSXBase.HTMLAttributes<HTMLDershopCartElement>;
            "dershop-cart-mini": LocalJSX.DershopCartMini & JSXBase.HTMLAttributes<HTMLDershopCartMiniElement>;
            "dershop-footer": LocalJSX.DershopFooter & JSXBase.HTMLAttributes<HTMLDershopFooterElement>;
            "dershop-form-register": LocalJSX.DershopFormRegister & JSXBase.HTMLAttributes<HTMLDershopFormRegisterElement>;
            "dershop-header": LocalJSX.DershopHeader & JSXBase.HTMLAttributes<HTMLDershopHeaderElement>;
            "dershop-icons-cart": LocalJSX.DershopIconsCart & JSXBase.HTMLAttributes<HTMLDershopIconsCartElement>;
            "dershop-icons-menu": LocalJSX.DershopIconsMenu & JSXBase.HTMLAttributes<HTMLDershopIconsMenuElement>;
            "dershop-icons-spotlight": LocalJSX.DershopIconsSpotlight & JSXBase.HTMLAttributes<HTMLDershopIconsSpotlightElement>;
            "dershop-image": LocalJSX.DershopImage & JSXBase.HTMLAttributes<HTMLDershopImageElement>;
            "dershop-layout": LocalJSX.DershopLayout & JSXBase.HTMLAttributes<HTMLDershopLayoutElement>;
            "dershop-logo": LocalJSX.DershopLogo & JSXBase.HTMLAttributes<HTMLDershopLogoElement>;
            "dershop-manufacturer": LocalJSX.DershopManufacturer & JSXBase.HTMLAttributes<HTMLDershopManufacturerElement>;
            "dershop-manufacturer-list": LocalJSX.DershopManufacturerList & JSXBase.HTMLAttributes<HTMLDershopManufacturerListElement>;
            "dershop-order-view": LocalJSX.DershopOrderView & JSXBase.HTMLAttributes<HTMLDershopOrderViewElement>;
            "dershop-product": LocalJSX.DershopProduct & JSXBase.HTMLAttributes<HTMLDershopProductElement>;
            "dershop-product-box": LocalJSX.DershopProductBox & JSXBase.HTMLAttributes<HTMLDershopProductBoxElement>;
            "dershop-product-list": LocalJSX.DershopProductList & JSXBase.HTMLAttributes<HTMLDershopProductListElement>;
            "dershop-route-account": LocalJSX.DershopRouteAccount & JSXBase.HTMLAttributes<HTMLDershopRouteAccountElement>;
            "dershop-route-admin-order-view": LocalJSX.DershopRouteAdminOrderView & JSXBase.HTMLAttributes<HTMLDershopRouteAdminOrderViewElement>;
            "dershop-route-admin-orders": LocalJSX.DershopRouteAdminOrders & JSXBase.HTMLAttributes<HTMLDershopRouteAdminOrdersElement>;
            "dershop-route-cart": LocalJSX.DershopRouteCart & JSXBase.HTMLAttributes<HTMLDershopRouteCartElement>;
            "dershop-route-index": LocalJSX.DershopRouteIndex & JSXBase.HTMLAttributes<HTMLDershopRouteIndexElement>;
            "dershop-route-login": LocalJSX.DershopRouteLogin & JSXBase.HTMLAttributes<HTMLDershopRouteLoginElement>;
            "dershop-route-products": LocalJSX.DershopRouteProducts & JSXBase.HTMLAttributes<HTMLDershopRouteProductsElement>;
            "dershop-route-register": LocalJSX.DershopRouteRegister & JSXBase.HTMLAttributes<HTMLDershopRouteRegisterElement>;
            "dershop-seo": LocalJSX.DershopSeo & JSXBase.HTMLAttributes<HTMLDershopSeoElement>;
            "dershop-sidebar": LocalJSX.DershopSidebar & JSXBase.HTMLAttributes<HTMLDershopSidebarElement>;
            "dershop-spotlight": LocalJSX.DershopSpotlight & JSXBase.HTMLAttributes<HTMLDershopSpotlightElement>;
            "dershop-testimonial": LocalJSX.DershopTestimonial & JSXBase.HTMLAttributes<HTMLDershopTestimonialElement>;
            "dershop-url": LocalJSX.DershopUrl & JSXBase.HTMLAttributes<HTMLDershopUrlElement>;
        }
    }
}
