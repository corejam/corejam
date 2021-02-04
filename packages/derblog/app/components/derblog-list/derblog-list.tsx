import { coreState } from "@corejam/core-components";
import { Component, h, Prop, State } from "@stencil/core";
import gql from "graphql-tag";
import { paginateArticlesGQL } from "../../../shared/graphql/Queries/Blog";
import { ArticleList } from "../../../shared/types/Blog";

@Component({
    tag: "derblog-list",
})
export class DerBlogList {

    @Prop() page = 1;
    @Prop() size: Number = 24;

    @State() _list: ArticleList;

    async queryData() {
        //Query the default list
        const request = await coreState.client.query({
            query: gql(paginateArticlesGQL),
            variables: {
                page: this.page,
                size: this.size,
            },
        });
        this._list = request.data.paginateArticles;
    }

    async componentWillRender() {
        await this.queryData()
    }

    render() {
        return (
            <corejam-box w={8} mx="auto" mt={10} mb={10}>
                <corejam-grid smTemplateColumns={2} mdTemplateColumns={2} lgTemplateColumns={2} gapCol={6} gapRow={6}>
                    {this._list.items.map(article => {
                        return <derblog-article-box article={article}></derblog-article-box>
                    })}
                </corejam-grid>
                <corejam-pagination
                    paginator={{
                        currentPage: this._list.currentPage,
                        lastPage: this._list.lastPage
                    }}></corejam-pagination>
            </corejam-box>
        )
    }
}