export const paginateArticlesGQL = `
  query PaginateBlogArticles($page: Int!, $size: Int!) {
    paginateArticles(page: $page, size: $size) {
      totalItems
      perPage
      currentPage
      lastPage
      items {
        id
        title
        description
        dateCreated
      }
    }
  }
`;