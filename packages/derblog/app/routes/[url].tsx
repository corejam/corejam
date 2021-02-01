import { coreState } from "@corejam/core-components";
import { Component, h, Host, Prop, State, Watch } from "@stencil/core";
import gql from "graphql-tag";
import { getObjectFromURL } from "../../shared/graphql/Queries/URL";
import { SEODocument } from "../../shared/types/SEO";

@Component({
    tag: "derblog-url"
})
export class UrlRoute {

    @Prop() param: any;
    @State() _param: any;
    @State() _data: SEODocument;
    @State() _object: any;
    @State() _component;

    @Watch("param")
    async rerenderForUrl() {
        await this.getComponentFromParam();
    }

    /**
     * Query for the object from the url
     */
    async getComponentFromParam() {
        this._param = typeof this.param === "string" ? JSON.parse(this.param) : this.param;
        this._data = await (
            await coreState.client.query({
                query: gql(getObjectFromURL),
                variables: {
                    url: this._param.url,
                },
            })
        ).data?.objectFromURL;

    }

    async componentWillLoad() {
        await this.getComponentFromParam();
    }

    getComponentForRoute() {
        if ((this._object = this._data?.article)) return <derblog-article article={this._object}></derblog-article>;
    }

    render() {
        return (
            <Host>
                {this.getComponentForRoute()}
                {this._object?.seo && <corejam-seo seo={this._object.seo}></corejam-seo>}
            </Host>
        );
    }
}