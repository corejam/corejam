import { SEO } from "@corejam/base/dist/typings/Seo";
import { Component, ComponentInterface, h, Prop, Host } from "@stencil/core";

@Component({
    tag: "dershop-seo",
    shadow: true,
})
export class SEOHeader implements ComponentInterface {
    @Prop() seo: SEO;

    componentWillRender() {
        insertMetaTags(this.seo)
    }

    render() {
        return (
            <Host>
            </Host>
        )
    }
}

const insertMetaTags = (seo: SEO) => {
    document.title = seo.metaTitle;
    createOgTag('og:title', seo?.metaTitle);
    createOgTag('og:description', seo?.metaDescription);
    createOgTag('og:url', window.location.href);
    createOgTag('og:image', "");

    createTwitterTag('twitter:card', `summary`);
    createTwitterTag('twitter:title', seo?.metaTitle);
    createTwitterTag('twitter:description', seo?.metaDescription);
    createTwitterTag('twitter:image', "");

    createTwitterTag('description', seo?.metaDescription);
}

const createOgTag = (type: string, content: string) => {
    let el = document.head.querySelector(`meta[property="${type}"]`);
    if (!el) {
        el = document.createElement('meta');
        el.setAttribute('property', type);
        el.setAttribute('content', content);
        document.head.appendChild(el);
    } else {
        el.setAttribute('property', type);
        el.setAttribute('content', content);
    }
};

const createTwitterTag = (type: string, content: string) => {
    let el = document.head.querySelector(`meta[name="${type}"]`);
    if (!el) {
        el = document.createElement('meta');
        el.setAttribute('name', type);
        el.setAttribute('content', content);
        document.head.appendChild(el);
    } else {
        el.setAttribute('name', type);
        el.setAttribute('content', content);
    }
};
