/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
import { Link } from "./components/Link/Link.types";
import { Display, Flex, Position } from "./components/Box/types";
import { Button } from "./components/Button/types";
import { options } from "./components/FormSelect/corejam-select";
import { GridType } from "./components/Grid/types";
import { Font, General } from "./components/Type/types";
export namespace Components {
    interface CorejamBaseLink {
        "color": Link.Color | "--cj-color-primary";
        "decoration": Link.Decoration | "--cj-link-decoration";
        "hoverColor": Link.Color | "--cj-color-secondary";
        "hoverDecoration": Link.Decoration | "--cj-link-hover-decoration";
        "href": Link.Href;
    }
    interface CorejamBox {
        "alignContent": Flex.AlignContent;
        "animation": string;
        "bColor": string;
        "bStyle": string;
        "bWidth": number;
        "bWidthBottom": number;
        "bWidthLeft": number;
        "bWidthRight": number;
        "bWidthTop": number;
        "basis": number;
        "bg": string;
        "bottom": number;
        "collapse": "collapse" | "separate";
        "direction": Flex.Direction;
        "display": Display;
        "droppableElements": string[];
        "flex": Flex.Flex;
        "flow": Flex.Flow;
        "grow": number;
        "h": string;
        "hide": boolean;
        "hoverBg": string;
        "items": Flex.AlignItems;
        "justify": Flex.Justify;
        "left": number;
        "lgAlignContent": Flex.AlignContent;
        "lgBasis": number;
        "lgBg": string;
        "lgDirection": Flex.Direction;
        "lgDisplay": Display;
        "lgFlow": Flex.Flow;
        "lgGrow": number;
        "lgH": string;
        "lgHide": boolean;
        "lgHoverBg": string;
        "lgIitems": Flex.AlignItems;
        "lgJustify": Flex.Justify;
        "lgM": number;
        "lgMax": string;
        "lgMb": number;
        "lgMl": number;
        "lgMr": number;
        "lgMt": number;
        "lgMx": string;
        "lgMy": number;
        "lgOrder": number;
        "lgP": number;
        "lgPb": number;
        "lgPl": number;
        "lgPr": number;
        "lgPt": number;
        "lgPx": number;
        "lgPy": number;
        "lgSelf": Flex.Self;
        "lgShow": string;
        "lgShrink": number;
        "lgW": number | string;
        "lgWrap": Flex.Wrap;
        "m": number;
        "max": string;
        "mb": number;
        "mdAlignContent": Flex.AlignContent;
        "mdBasis": number;
        "mdBg": string;
        "mdDirection": Flex.Direction;
        "mdDisplay": Display;
        "mdFlow": Flex.Flow;
        "mdGrow": number;
        "mdH": string;
        "mdHide": boolean;
        "mdHoverBg": string;
        "mdItems": Flex.AlignItems;
        "mdJustify": Flex.Justify;
        "mdM": number;
        "mdMax": string;
        "mdMb": number;
        "mdMl": number;
        "mdMr": number;
        "mdMt": number;
        "mdMx": string;
        "mdMy": number;
        "mdOrder": number;
        "mdP": number;
        "mdPb": number;
        "mdPl": number;
        "mdPr": number;
        "mdPt": number;
        "mdPx": number;
        "mdPy": number;
        "mdSelf": Flex.Self;
        "mdShow": string;
        "mdShrink": number;
        "mdW": number | string;
        "mdWrap": Flex.Wrap;
        "minH": string;
        "ml": number;
        "mr": number;
        "mt": number;
        "mx": string;
        "my": number;
        "order": number;
        "p": number;
        "pb": number;
        "pl": number;
        "position": Position;
        "pr": number;
        "pt": number;
        "px": number;
        "py": number;
        "right": number;
        "rounded": string;
        "roundedBottom": string;
        "roundedLeft": string;
        "roundedRight": string;
        "roundedTop": string;
        "self": Flex.Self;
        "shadow": string;
        "show": string;
        "shrink": number;
        "smAlignContent": Flex.AlignContent;
        "smBasis": number;
        "smBg": string;
        "smDirection": Flex.Direction;
        "smDisplay": Display;
        "smFlow": Flex.Flow;
        "smGrow": number;
        "smH": string;
        "smHide": boolean;
        "smHoverBg": string;
        "smItems": Flex.AlignItems;
        "smJustify": Flex.Justify;
        "smM": number;
        "smMax": string;
        "smMb": number;
        "smMl": number;
        "smMr": number;
        "smMt": number;
        "smMx": string;
        "smMy": number;
        "smOrder": number;
        "smP": number;
        "smPb": number;
        "smPl": number;
        "smPr": number;
        "smPt": number;
        "smPx": number;
        "smPy": number;
        "smSelf": Flex.Self;
        "smShow": string;
        "smShrink": number;
        "smW": number | string;
        "smWrap": Flex.Wrap;
        "top": number;
        "w": number | string;
        "wrap": Flex.Wrap;
        "xlAlignContent": Flex.AlignContent;
        "xlBasis": number;
        "xlBg": string;
        "xlDirection": Flex.Direction;
        "xlDisplay": Display;
        "xlFlow": Flex.Flow;
        "xlGrow": number;
        "xlH": string;
        "xlHide": boolean;
        "xlHoverBg": string;
        "xlItems": Flex.AlignItems;
        "xlM": number;
        "xlMax": string;
        "xlMb": number;
        "xlMl": number;
        "xlMr": number;
        "xlMt": number;
        "xlMx": string;
        "xlMy": number;
        "xlOrder": number;
        "xlP": number;
        "xlPb": number;
        "xlPl": number;
        "xlPr": number;
        "xlPt": number;
        "xlPx": number;
        "xlPy": number;
        "xlSelf": Flex.Self;
        "xlShow": string;
        "xlShrink": number;
        "xlW": number | string;
        "xlWrap": Flex.Wrap;
        "xljustify": Flex.Justify;
        "z": number;
    }
    interface CorejamButton {
        "bg": string;
        "color": string;
        "p": string;
        "pb": string;
        "pl": string;
        "pr": string;
        "pt": string;
        "type": Button.Type;
    }
    interface CorejamDataFetcher {
        "query": string;
        "renderer": Function;
    }
    interface CorejamDataProvider {
        "url": string;
    }
    interface CorejamError {
    }
    interface CorejamFormContainer {
        "name": string;
        "submitHandler": Function;
    }
    interface CorejamFormInput {
        /**
          * Form specific props
         */
        "_id"?: string;
        "autocomplete": string;
        "autofocus": boolean;
        "bWidth": number;
        "bg": string;
        "checked"?: boolean;
        "focusBg": string;
        "focusOutline": string;
        "formId": string;
        "hoverBg": string;
        "label"?: string;
        "name": string;
        "p": number;
        "placeholder"?: string;
        "required": boolean;
        "type": string;
        "value": string | number;
        /**
          * Style specific prop
         */
        "w": number;
    }
    interface CorejamFormSelect {
        "formId": string;
        "label": string;
        "multiple": boolean;
        "name": string;
        "options": Array<options>;
        "selected": any;
    }
    interface CorejamFormSubmit {
        "formId": string;
    }
    interface CorejamGrid {
        "autoFlow": GridType.Flow;
        "cols": GridType.Cols;
        "colsEnd": GridType.ColsEnd;
        "colsStart": GridType.ColsStart;
        "gap": GridType.Gap;
        "gapCol": GridType.Gap;
        "gapRow": GridType.Gap;
        "grid": Boolean;
        "lgAutoFlow": GridType.Flow;
        "lgCols": GridType.Cols;
        "lgColsEnd": GridType.ColsEnd;
        "lgColsStart": GridType.ColsStart;
        "lgGap": GridType.Gap;
        "lgGapCol": GridType.Gap;
        "lgGapRow": GridType.Gap;
        "lgRows": GridType.Rows;
        "lgRowsEnd": GridType.RowsEnd;
        "lgRowsStart": GridType.RowsStart;
        "lgTemplateColumns": GridType.TemplateColumns;
        "lgTemplateRows": GridType.TemplateRows;
        "mdAutoFlow": GridType.Flow;
        "mdCols": GridType.Cols;
        "mdColsEnd": GridType.ColsEnd;
        "mdColsStart": GridType.ColsStart;
        "mdGap": GridType.Gap;
        "mdGapCol": GridType.Gap;
        "mdGapRow": GridType.Gap;
        "mdRows": GridType.Rows;
        "mdRowsEnd": GridType.RowsEnd;
        "mdRowsStart": GridType.RowsStart;
        "mdTemplateColumns": GridType.TemplateColumns;
        "mdTemplateRows": GridType.TemplateRows;
        "rows": GridType.Rows;
        "rowsEnd": GridType.RowsEnd;
        "rowsStart": GridType.RowsStart;
        "smAutoFlow": GridType.Flow;
        "smCols": GridType.Cols;
        "smColsEnd": GridType.ColsEnd;
        "smColsStart": GridType.ColsStart;
        "smGap": GridType.Gap;
        "smGapCol": GridType.Gap;
        "smGapRow": GridType.Gap;
        "smRows": GridType.Rows;
        "smRowsEnd": GridType.RowsEnd;
        "smRowsStart": GridType.RowsStart;
        "smTemplateColumns": GridType.TemplateColumns;
        "smTemplateRows": GridType.TemplateRows;
        "templateColumns": GridType.TemplateColumns;
        "templateRows": GridType.TemplateRows;
        "xlAutoFlow": GridType.Flow;
        "xlCols": GridType.Cols;
        "xlColsEnd": GridType.ColsEnd;
        "xlColsStart": GridType.ColsStart;
        "xlGap": GridType.Gap;
        "xlGapCol": GridType.Gap;
        "xlGapRow": GridType.Gap;
        "xlRows": GridType.Rows;
        "xlRowsEnd": GridType.RowsEnd;
        "xlRowsStart": GridType.RowsStart;
        "xlTemplateColumns": GridType.TemplateColumns;
        "xlTemplateRows": GridType.TemplateRows;
    }
    interface CorejamImage {
        "alt": string;
        "fit": "cover";
        "h": string;
        "lazy": boolean;
        "maxH": string;
        "maxWidth": number;
        "rounded": "full";
        "src": string;
        "w": number;
    }
    interface CorejamInit {
        "router": any;
    }
    interface CorejamPagination {
        "paginator": any;
    }
    interface CorejamTest {
    }
    interface CorejamType {
        "align": Font.Align;
        "as": Font.As;
        "color": General.Color;
        "decoration": Font.Decoration;
        "droppableElements": string[];
        "family": Font.Family;
        "fontStyle": Font.Style;
        "lineHeight": Font.lineHeight;
        "size": Font.Size;
        "smooth": Font.Smoothnes;
        "spacing": Font.Spacing;
        "transform": Font.Transform;
        "weight": Font.Weight;
    }
    interface CorejamUiBase {
    }
    interface CorejamUiTheme {
        "theme": object | string;
    }
}
declare global {
    interface HTMLCorejamBaseLinkElement extends Components.CorejamBaseLink, HTMLStencilElement {
    }
    var HTMLCorejamBaseLinkElement: {
        prototype: HTMLCorejamBaseLinkElement;
        new (): HTMLCorejamBaseLinkElement;
    };
    interface HTMLCorejamBoxElement extends Components.CorejamBox, HTMLStencilElement {
    }
    var HTMLCorejamBoxElement: {
        prototype: HTMLCorejamBoxElement;
        new (): HTMLCorejamBoxElement;
    };
    interface HTMLCorejamButtonElement extends Components.CorejamButton, HTMLStencilElement {
    }
    var HTMLCorejamButtonElement: {
        prototype: HTMLCorejamButtonElement;
        new (): HTMLCorejamButtonElement;
    };
    interface HTMLCorejamDataFetcherElement extends Components.CorejamDataFetcher, HTMLStencilElement {
    }
    var HTMLCorejamDataFetcherElement: {
        prototype: HTMLCorejamDataFetcherElement;
        new (): HTMLCorejamDataFetcherElement;
    };
    interface HTMLCorejamDataProviderElement extends Components.CorejamDataProvider, HTMLStencilElement {
    }
    var HTMLCorejamDataProviderElement: {
        prototype: HTMLCorejamDataProviderElement;
        new (): HTMLCorejamDataProviderElement;
    };
    interface HTMLCorejamErrorElement extends Components.CorejamError, HTMLStencilElement {
    }
    var HTMLCorejamErrorElement: {
        prototype: HTMLCorejamErrorElement;
        new (): HTMLCorejamErrorElement;
    };
    interface HTMLCorejamFormContainerElement extends Components.CorejamFormContainer, HTMLStencilElement {
    }
    var HTMLCorejamFormContainerElement: {
        prototype: HTMLCorejamFormContainerElement;
        new (): HTMLCorejamFormContainerElement;
    };
    interface HTMLCorejamFormInputElement extends Components.CorejamFormInput, HTMLStencilElement {
    }
    var HTMLCorejamFormInputElement: {
        prototype: HTMLCorejamFormInputElement;
        new (): HTMLCorejamFormInputElement;
    };
    interface HTMLCorejamFormSelectElement extends Components.CorejamFormSelect, HTMLStencilElement {
    }
    var HTMLCorejamFormSelectElement: {
        prototype: HTMLCorejamFormSelectElement;
        new (): HTMLCorejamFormSelectElement;
    };
    interface HTMLCorejamFormSubmitElement extends Components.CorejamFormSubmit, HTMLStencilElement {
    }
    var HTMLCorejamFormSubmitElement: {
        prototype: HTMLCorejamFormSubmitElement;
        new (): HTMLCorejamFormSubmitElement;
    };
    interface HTMLCorejamGridElement extends Components.CorejamGrid, HTMLStencilElement {
    }
    var HTMLCorejamGridElement: {
        prototype: HTMLCorejamGridElement;
        new (): HTMLCorejamGridElement;
    };
    interface HTMLCorejamImageElement extends Components.CorejamImage, HTMLStencilElement {
    }
    var HTMLCorejamImageElement: {
        prototype: HTMLCorejamImageElement;
        new (): HTMLCorejamImageElement;
    };
    interface HTMLCorejamInitElement extends Components.CorejamInit, HTMLStencilElement {
    }
    var HTMLCorejamInitElement: {
        prototype: HTMLCorejamInitElement;
        new (): HTMLCorejamInitElement;
    };
    interface HTMLCorejamPaginationElement extends Components.CorejamPagination, HTMLStencilElement {
    }
    var HTMLCorejamPaginationElement: {
        prototype: HTMLCorejamPaginationElement;
        new (): HTMLCorejamPaginationElement;
    };
    interface HTMLCorejamTestElement extends Components.CorejamTest, HTMLStencilElement {
    }
    var HTMLCorejamTestElement: {
        prototype: HTMLCorejamTestElement;
        new (): HTMLCorejamTestElement;
    };
    interface HTMLCorejamTypeElement extends Components.CorejamType, HTMLStencilElement {
    }
    var HTMLCorejamTypeElement: {
        prototype: HTMLCorejamTypeElement;
        new (): HTMLCorejamTypeElement;
    };
    interface HTMLCorejamUiBaseElement extends Components.CorejamUiBase, HTMLStencilElement {
    }
    var HTMLCorejamUiBaseElement: {
        prototype: HTMLCorejamUiBaseElement;
        new (): HTMLCorejamUiBaseElement;
    };
    interface HTMLCorejamUiThemeElement extends Components.CorejamUiTheme, HTMLStencilElement {
    }
    var HTMLCorejamUiThemeElement: {
        prototype: HTMLCorejamUiThemeElement;
        new (): HTMLCorejamUiThemeElement;
    };
    interface HTMLElementTagNameMap {
        "corejam-base-link": HTMLCorejamBaseLinkElement;
        "corejam-box": HTMLCorejamBoxElement;
        "corejam-button": HTMLCorejamButtonElement;
        "corejam-data-fetcher": HTMLCorejamDataFetcherElement;
        "corejam-data-provider": HTMLCorejamDataProviderElement;
        "corejam-error": HTMLCorejamErrorElement;
        "corejam-form-container": HTMLCorejamFormContainerElement;
        "corejam-form-input": HTMLCorejamFormInputElement;
        "corejam-form-select": HTMLCorejamFormSelectElement;
        "corejam-form-submit": HTMLCorejamFormSubmitElement;
        "corejam-grid": HTMLCorejamGridElement;
        "corejam-image": HTMLCorejamImageElement;
        "corejam-init": HTMLCorejamInitElement;
        "corejam-pagination": HTMLCorejamPaginationElement;
        "corejam-test": HTMLCorejamTestElement;
        "corejam-type": HTMLCorejamTypeElement;
        "corejam-ui-base": HTMLCorejamUiBaseElement;
        "corejam-ui-theme": HTMLCorejamUiThemeElement;
    }
}
declare namespace LocalJSX {
    interface CorejamBaseLink {
        "color"?: Link.Color | "--cj-color-primary";
        "decoration"?: Link.Decoration | "--cj-link-decoration";
        "hoverColor"?: Link.Color | "--cj-color-secondary";
        "hoverDecoration"?: Link.Decoration | "--cj-link-hover-decoration";
        "href"?: Link.Href;
        "onRouteChange"?: (event: CustomEvent<any>) => void;
    }
    interface CorejamBox {
        "alignContent"?: Flex.AlignContent;
        "animation"?: string;
        "bColor"?: string;
        "bStyle"?: string;
        "bWidth"?: number;
        "bWidthBottom"?: number;
        "bWidthLeft"?: number;
        "bWidthRight"?: number;
        "bWidthTop"?: number;
        "basis"?: number;
        "bg"?: string;
        "bottom"?: number;
        "collapse"?: "collapse" | "separate";
        "direction"?: Flex.Direction;
        "display"?: Display;
        "droppableElements"?: string[];
        "flex"?: Flex.Flex;
        "flow"?: Flex.Flow;
        "grow"?: number;
        "h"?: string;
        "hide"?: boolean;
        "hoverBg"?: string;
        "items"?: Flex.AlignItems;
        "justify"?: Flex.Justify;
        "left"?: number;
        "lgAlignContent"?: Flex.AlignContent;
        "lgBasis"?: number;
        "lgBg"?: string;
        "lgDirection"?: Flex.Direction;
        "lgDisplay"?: Display;
        "lgFlow"?: Flex.Flow;
        "lgGrow"?: number;
        "lgH"?: string;
        "lgHide"?: boolean;
        "lgHoverBg"?: string;
        "lgIitems"?: Flex.AlignItems;
        "lgJustify"?: Flex.Justify;
        "lgM"?: number;
        "lgMax"?: string;
        "lgMb"?: number;
        "lgMl"?: number;
        "lgMr"?: number;
        "lgMt"?: number;
        "lgMx"?: string;
        "lgMy"?: number;
        "lgOrder"?: number;
        "lgP"?: number;
        "lgPb"?: number;
        "lgPl"?: number;
        "lgPr"?: number;
        "lgPt"?: number;
        "lgPx"?: number;
        "lgPy"?: number;
        "lgSelf"?: Flex.Self;
        "lgShow"?: string;
        "lgShrink"?: number;
        "lgW"?: number | string;
        "lgWrap"?: Flex.Wrap;
        "m"?: number;
        "max"?: string;
        "mb"?: number;
        "mdAlignContent"?: Flex.AlignContent;
        "mdBasis"?: number;
        "mdBg"?: string;
        "mdDirection"?: Flex.Direction;
        "mdDisplay"?: Display;
        "mdFlow"?: Flex.Flow;
        "mdGrow"?: number;
        "mdH"?: string;
        "mdHide"?: boolean;
        "mdHoverBg"?: string;
        "mdItems"?: Flex.AlignItems;
        "mdJustify"?: Flex.Justify;
        "mdM"?: number;
        "mdMax"?: string;
        "mdMb"?: number;
        "mdMl"?: number;
        "mdMr"?: number;
        "mdMt"?: number;
        "mdMx"?: string;
        "mdMy"?: number;
        "mdOrder"?: number;
        "mdP"?: number;
        "mdPb"?: number;
        "mdPl"?: number;
        "mdPr"?: number;
        "mdPt"?: number;
        "mdPx"?: number;
        "mdPy"?: number;
        "mdSelf"?: Flex.Self;
        "mdShow"?: string;
        "mdShrink"?: number;
        "mdW"?: number | string;
        "mdWrap"?: Flex.Wrap;
        "minH"?: string;
        "ml"?: number;
        "mr"?: number;
        "mt"?: number;
        "mx"?: string;
        "my"?: number;
        "order"?: number;
        "p"?: number;
        "pb"?: number;
        "pl"?: number;
        "position"?: Position;
        "pr"?: number;
        "pt"?: number;
        "px"?: number;
        "py"?: number;
        "right"?: number;
        "rounded"?: string;
        "roundedBottom"?: string;
        "roundedLeft"?: string;
        "roundedRight"?: string;
        "roundedTop"?: string;
        "self"?: Flex.Self;
        "shadow"?: string;
        "show"?: string;
        "shrink"?: number;
        "smAlignContent"?: Flex.AlignContent;
        "smBasis"?: number;
        "smBg"?: string;
        "smDirection"?: Flex.Direction;
        "smDisplay"?: Display;
        "smFlow"?: Flex.Flow;
        "smGrow"?: number;
        "smH"?: string;
        "smHide"?: boolean;
        "smHoverBg"?: string;
        "smItems"?: Flex.AlignItems;
        "smJustify"?: Flex.Justify;
        "smM"?: number;
        "smMax"?: string;
        "smMb"?: number;
        "smMl"?: number;
        "smMr"?: number;
        "smMt"?: number;
        "smMx"?: string;
        "smMy"?: number;
        "smOrder"?: number;
        "smP"?: number;
        "smPb"?: number;
        "smPl"?: number;
        "smPr"?: number;
        "smPt"?: number;
        "smPx"?: number;
        "smPy"?: number;
        "smSelf"?: Flex.Self;
        "smShow"?: string;
        "smShrink"?: number;
        "smW"?: number | string;
        "smWrap"?: Flex.Wrap;
        "top"?: number;
        "w"?: number | string;
        "wrap"?: Flex.Wrap;
        "xlAlignContent"?: Flex.AlignContent;
        "xlBasis"?: number;
        "xlBg"?: string;
        "xlDirection"?: Flex.Direction;
        "xlDisplay"?: Display;
        "xlFlow"?: Flex.Flow;
        "xlGrow"?: number;
        "xlH"?: string;
        "xlHide"?: boolean;
        "xlHoverBg"?: string;
        "xlItems"?: Flex.AlignItems;
        "xlM"?: number;
        "xlMax"?: string;
        "xlMb"?: number;
        "xlMl"?: number;
        "xlMr"?: number;
        "xlMt"?: number;
        "xlMx"?: string;
        "xlMy"?: number;
        "xlOrder"?: number;
        "xlP"?: number;
        "xlPb"?: number;
        "xlPl"?: number;
        "xlPr"?: number;
        "xlPt"?: number;
        "xlPx"?: number;
        "xlPy"?: number;
        "xlSelf"?: Flex.Self;
        "xlShow"?: string;
        "xlShrink"?: number;
        "xlW"?: number | string;
        "xlWrap"?: Flex.Wrap;
        "xljustify"?: Flex.Justify;
        "z"?: number;
    }
    interface CorejamButton {
        "bg"?: string;
        "color"?: string;
        "p"?: string;
        "pb"?: string;
        "pl"?: string;
        "pr"?: string;
        "pt"?: string;
        "type"?: Button.Type;
    }
    interface CorejamDataFetcher {
        "query"?: string;
        "renderer"?: Function;
    }
    interface CorejamDataProvider {
        "url"?: string;
    }
    interface CorejamError {
    }
    interface CorejamFormContainer {
        "name"?: string;
        "onFormEvent"?: (event: CustomEvent<any>) => void;
        "onFormSubmit"?: (event: CustomEvent<any>) => void;
        "onSendForm"?: (event: CustomEvent<any>) => void;
        "submitHandler"?: Function;
    }
    interface CorejamFormInput {
        /**
          * Form specific props
         */
        "_id"?: string;
        "autocomplete"?: string;
        "autofocus"?: boolean;
        "bWidth"?: number;
        "bg"?: string;
        "checked"?: boolean;
        "focusBg"?: string;
        "focusOutline"?: string;
        "formId"?: string;
        "hoverBg"?: string;
        "label"?: string;
        "name"?: string;
        "onFormEvent"?: (event: CustomEvent<any>) => void;
        "p"?: number;
        "placeholder"?: string;
        "required"?: boolean;
        "type"?: string;
        "value"?: string | number;
        /**
          * Style specific prop
         */
        "w"?: number;
    }
    interface CorejamFormSelect {
        "formId"?: string;
        "label"?: string;
        "multiple"?: boolean;
        "name"?: string;
        "onFormEvent"?: (event: CustomEvent<any>) => void;
        "options"?: Array<options>;
        "selected"?: any;
    }
    interface CorejamFormSubmit {
        "formId"?: string;
        "onFormSubmit"?: (event: CustomEvent<any>) => void;
    }
    interface CorejamGrid {
        "autoFlow"?: GridType.Flow;
        "cols"?: GridType.Cols;
        "colsEnd"?: GridType.ColsEnd;
        "colsStart"?: GridType.ColsStart;
        "gap"?: GridType.Gap;
        "gapCol"?: GridType.Gap;
        "gapRow"?: GridType.Gap;
        "grid"?: Boolean;
        "lgAutoFlow"?: GridType.Flow;
        "lgCols"?: GridType.Cols;
        "lgColsEnd"?: GridType.ColsEnd;
        "lgColsStart"?: GridType.ColsStart;
        "lgGap"?: GridType.Gap;
        "lgGapCol"?: GridType.Gap;
        "lgGapRow"?: GridType.Gap;
        "lgRows"?: GridType.Rows;
        "lgRowsEnd"?: GridType.RowsEnd;
        "lgRowsStart"?: GridType.RowsStart;
        "lgTemplateColumns"?: GridType.TemplateColumns;
        "lgTemplateRows"?: GridType.TemplateRows;
        "mdAutoFlow"?: GridType.Flow;
        "mdCols"?: GridType.Cols;
        "mdColsEnd"?: GridType.ColsEnd;
        "mdColsStart"?: GridType.ColsStart;
        "mdGap"?: GridType.Gap;
        "mdGapCol"?: GridType.Gap;
        "mdGapRow"?: GridType.Gap;
        "mdRows"?: GridType.Rows;
        "mdRowsEnd"?: GridType.RowsEnd;
        "mdRowsStart"?: GridType.RowsStart;
        "mdTemplateColumns"?: GridType.TemplateColumns;
        "mdTemplateRows"?: GridType.TemplateRows;
        "rows"?: GridType.Rows;
        "rowsEnd"?: GridType.RowsEnd;
        "rowsStart"?: GridType.RowsStart;
        "smAutoFlow"?: GridType.Flow;
        "smCols"?: GridType.Cols;
        "smColsEnd"?: GridType.ColsEnd;
        "smColsStart"?: GridType.ColsStart;
        "smGap"?: GridType.Gap;
        "smGapCol"?: GridType.Gap;
        "smGapRow"?: GridType.Gap;
        "smRows"?: GridType.Rows;
        "smRowsEnd"?: GridType.RowsEnd;
        "smRowsStart"?: GridType.RowsStart;
        "smTemplateColumns"?: GridType.TemplateColumns;
        "smTemplateRows"?: GridType.TemplateRows;
        "templateColumns"?: GridType.TemplateColumns;
        "templateRows"?: GridType.TemplateRows;
        "xlAutoFlow"?: GridType.Flow;
        "xlCols"?: GridType.Cols;
        "xlColsEnd"?: GridType.ColsEnd;
        "xlColsStart"?: GridType.ColsStart;
        "xlGap"?: GridType.Gap;
        "xlGapCol"?: GridType.Gap;
        "xlGapRow"?: GridType.Gap;
        "xlRows"?: GridType.Rows;
        "xlRowsEnd"?: GridType.RowsEnd;
        "xlRowsStart"?: GridType.RowsStart;
        "xlTemplateColumns"?: GridType.TemplateColumns;
        "xlTemplateRows"?: GridType.TemplateRows;
    }
    interface CorejamImage {
        "alt"?: string;
        "fit"?: "cover";
        "h"?: string;
        "lazy"?: boolean;
        "maxH"?: string;
        "maxWidth"?: number;
        "rounded"?: "full";
        "src"?: string;
        "w"?: number;
    }
    interface CorejamInit {
        "router"?: any;
    }
    interface CorejamPagination {
        "paginator"?: any;
    }
    interface CorejamTest {
    }
    interface CorejamType {
        "align"?: Font.Align;
        "as"?: Font.As;
        "color"?: General.Color;
        "decoration"?: Font.Decoration;
        "droppableElements"?: string[];
        "family"?: Font.Family;
        "fontStyle"?: Font.Style;
        "lineHeight"?: Font.lineHeight;
        "size"?: Font.Size;
        "smooth"?: Font.Smoothnes;
        "spacing"?: Font.Spacing;
        "transform"?: Font.Transform;
        "weight"?: Font.Weight;
    }
    interface CorejamUiBase {
    }
    interface CorejamUiTheme {
        "theme"?: object | string;
    }
    interface IntrinsicElements {
        "corejam-base-link": CorejamBaseLink;
        "corejam-box": CorejamBox;
        "corejam-button": CorejamButton;
        "corejam-data-fetcher": CorejamDataFetcher;
        "corejam-data-provider": CorejamDataProvider;
        "corejam-error": CorejamError;
        "corejam-form-container": CorejamFormContainer;
        "corejam-form-input": CorejamFormInput;
        "corejam-form-select": CorejamFormSelect;
        "corejam-form-submit": CorejamFormSubmit;
        "corejam-grid": CorejamGrid;
        "corejam-image": CorejamImage;
        "corejam-init": CorejamInit;
        "corejam-pagination": CorejamPagination;
        "corejam-test": CorejamTest;
        "corejam-type": CorejamType;
        "corejam-ui-base": CorejamUiBase;
        "corejam-ui-theme": CorejamUiTheme;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "corejam-base-link": LocalJSX.CorejamBaseLink & JSXBase.HTMLAttributes<HTMLCorejamBaseLinkElement>;
            "corejam-box": LocalJSX.CorejamBox & JSXBase.HTMLAttributes<HTMLCorejamBoxElement>;
            "corejam-button": LocalJSX.CorejamButton & JSXBase.HTMLAttributes<HTMLCorejamButtonElement>;
            "corejam-data-fetcher": LocalJSX.CorejamDataFetcher & JSXBase.HTMLAttributes<HTMLCorejamDataFetcherElement>;
            "corejam-data-provider": LocalJSX.CorejamDataProvider & JSXBase.HTMLAttributes<HTMLCorejamDataProviderElement>;
            "corejam-error": LocalJSX.CorejamError & JSXBase.HTMLAttributes<HTMLCorejamErrorElement>;
            "corejam-form-container": LocalJSX.CorejamFormContainer & JSXBase.HTMLAttributes<HTMLCorejamFormContainerElement>;
            "corejam-form-input": LocalJSX.CorejamFormInput & JSXBase.HTMLAttributes<HTMLCorejamFormInputElement>;
            "corejam-form-select": LocalJSX.CorejamFormSelect & JSXBase.HTMLAttributes<HTMLCorejamFormSelectElement>;
            "corejam-form-submit": LocalJSX.CorejamFormSubmit & JSXBase.HTMLAttributes<HTMLCorejamFormSubmitElement>;
            "corejam-grid": LocalJSX.CorejamGrid & JSXBase.HTMLAttributes<HTMLCorejamGridElement>;
            "corejam-image": LocalJSX.CorejamImage & JSXBase.HTMLAttributes<HTMLCorejamImageElement>;
            "corejam-init": LocalJSX.CorejamInit & JSXBase.HTMLAttributes<HTMLCorejamInitElement>;
            "corejam-pagination": LocalJSX.CorejamPagination & JSXBase.HTMLAttributes<HTMLCorejamPaginationElement>;
            "corejam-test": LocalJSX.CorejamTest & JSXBase.HTMLAttributes<HTMLCorejamTestElement>;
            "corejam-type": LocalJSX.CorejamType & JSXBase.HTMLAttributes<HTMLCorejamTypeElement>;
            "corejam-ui-base": LocalJSX.CorejamUiBase & JSXBase.HTMLAttributes<HTMLCorejamUiBaseElement>;
            "corejam-ui-theme": LocalJSX.CorejamUiTheme & JSXBase.HTMLAttributes<HTMLCorejamUiThemeElement>;
        }
    }
}
