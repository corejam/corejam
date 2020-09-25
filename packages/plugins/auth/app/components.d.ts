/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
export namespace Components {
    interface AuthAdminUserForm {
        "error": boolean;
        "formId": string;
    }
    interface AuthAdminUserList {
        "data": any;
        "page": number;
    }
    interface CjRouteAdmin {
        "param": any;
    }
    interface CjRouteAdminUserForm {
        "param": any;
    }
    interface CorejamAuthFormLogin {
        "error": boolean;
    }
    interface CorejamAuthFormRegister {
    }
    interface CorejamAuthHeader {
    }
    interface CorejamIconsAccount {
    }
    interface CorejamIdentity {
        "loginLink": string;
        "registerLink": string;
    }
}
declare global {
    interface HTMLAuthAdminUserFormElement extends Components.AuthAdminUserForm, HTMLStencilElement {
    }
    var HTMLAuthAdminUserFormElement: {
        prototype: HTMLAuthAdminUserFormElement;
        new (): HTMLAuthAdminUserFormElement;
    };
    interface HTMLAuthAdminUserListElement extends Components.AuthAdminUserList, HTMLStencilElement {
    }
    var HTMLAuthAdminUserListElement: {
        prototype: HTMLAuthAdminUserListElement;
        new (): HTMLAuthAdminUserListElement;
    };
    interface HTMLCjRouteAdminElement extends Components.CjRouteAdmin, HTMLStencilElement {
    }
    var HTMLCjRouteAdminElement: {
        prototype: HTMLCjRouteAdminElement;
        new (): HTMLCjRouteAdminElement;
    };
    interface HTMLCjRouteAdminUserFormElement extends Components.CjRouteAdminUserForm, HTMLStencilElement {
    }
    var HTMLCjRouteAdminUserFormElement: {
        prototype: HTMLCjRouteAdminUserFormElement;
        new (): HTMLCjRouteAdminUserFormElement;
    };
    interface HTMLCorejamAuthFormLoginElement extends Components.CorejamAuthFormLogin, HTMLStencilElement {
    }
    var HTMLCorejamAuthFormLoginElement: {
        prototype: HTMLCorejamAuthFormLoginElement;
        new (): HTMLCorejamAuthFormLoginElement;
    };
    interface HTMLCorejamAuthFormRegisterElement extends Components.CorejamAuthFormRegister, HTMLStencilElement {
    }
    var HTMLCorejamAuthFormRegisterElement: {
        prototype: HTMLCorejamAuthFormRegisterElement;
        new (): HTMLCorejamAuthFormRegisterElement;
    };
    interface HTMLCorejamAuthHeaderElement extends Components.CorejamAuthHeader, HTMLStencilElement {
    }
    var HTMLCorejamAuthHeaderElement: {
        prototype: HTMLCorejamAuthHeaderElement;
        new (): HTMLCorejamAuthHeaderElement;
    };
    interface HTMLCorejamIconsAccountElement extends Components.CorejamIconsAccount, HTMLStencilElement {
    }
    var HTMLCorejamIconsAccountElement: {
        prototype: HTMLCorejamIconsAccountElement;
        new (): HTMLCorejamIconsAccountElement;
    };
    interface HTMLCorejamIdentityElement extends Components.CorejamIdentity, HTMLStencilElement {
    }
    var HTMLCorejamIdentityElement: {
        prototype: HTMLCorejamIdentityElement;
        new (): HTMLCorejamIdentityElement;
    };
    interface HTMLElementTagNameMap {
        "auth-admin-user-form": HTMLAuthAdminUserFormElement;
        "auth-admin-user-list": HTMLAuthAdminUserListElement;
        "cj-route-admin": HTMLCjRouteAdminElement;
        "cj-route-admin-user-form": HTMLCjRouteAdminUserFormElement;
        "corejam-auth-form-login": HTMLCorejamAuthFormLoginElement;
        "corejam-auth-form-register": HTMLCorejamAuthFormRegisterElement;
        "corejam-auth-header": HTMLCorejamAuthHeaderElement;
        "corejam-icons-account": HTMLCorejamIconsAccountElement;
        "corejam-identity": HTMLCorejamIdentityElement;
    }
}
declare namespace LocalJSX {
    interface AuthAdminUserForm {
        "error"?: boolean;
        "formId"?: string;
    }
    interface AuthAdminUserList {
        "data"?: any;
        "page"?: number;
    }
    interface CjRouteAdmin {
        "param"?: any;
    }
    interface CjRouteAdminUserForm {
        "param"?: any;
    }
    interface CorejamAuthFormLogin {
        "error"?: boolean;
    }
    interface CorejamAuthFormRegister {
    }
    interface CorejamAuthHeader {
    }
    interface CorejamIconsAccount {
    }
    interface CorejamIdentity {
        "loginLink"?: string;
        "registerLink"?: string;
    }
    interface IntrinsicElements {
        "auth-admin-user-form": AuthAdminUserForm;
        "auth-admin-user-list": AuthAdminUserList;
        "cj-route-admin": CjRouteAdmin;
        "cj-route-admin-user-form": CjRouteAdminUserForm;
        "corejam-auth-form-login": CorejamAuthFormLogin;
        "corejam-auth-form-register": CorejamAuthFormRegister;
        "corejam-auth-header": CorejamAuthHeader;
        "corejam-icons-account": CorejamIconsAccount;
        "corejam-identity": CorejamIdentity;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "auth-admin-user-form": LocalJSX.AuthAdminUserForm & JSXBase.HTMLAttributes<HTMLAuthAdminUserFormElement>;
            "auth-admin-user-list": LocalJSX.AuthAdminUserList & JSXBase.HTMLAttributes<HTMLAuthAdminUserListElement>;
            "cj-route-admin": LocalJSX.CjRouteAdmin & JSXBase.HTMLAttributes<HTMLCjRouteAdminElement>;
            "cj-route-admin-user-form": LocalJSX.CjRouteAdminUserForm & JSXBase.HTMLAttributes<HTMLCjRouteAdminUserFormElement>;
            "corejam-auth-form-login": LocalJSX.CorejamAuthFormLogin & JSXBase.HTMLAttributes<HTMLCorejamAuthFormLoginElement>;
            "corejam-auth-form-register": LocalJSX.CorejamAuthFormRegister & JSXBase.HTMLAttributes<HTMLCorejamAuthFormRegisterElement>;
            "corejam-auth-header": LocalJSX.CorejamAuthHeader & JSXBase.HTMLAttributes<HTMLCorejamAuthHeaderElement>;
            "corejam-icons-account": LocalJSX.CorejamIconsAccount & JSXBase.HTMLAttributes<HTMLCorejamIconsAccountElement>;
            "corejam-identity": LocalJSX.CorejamIdentity & JSXBase.HTMLAttributes<HTMLCorejamIdentityElement>;
        }
    }
}
