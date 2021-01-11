export const adminAllCategoriesGQL = `
  query {
    allCategories {
      items {
        id
        name
      }
      page_last
      page_current
      items_total
    }
  }
`;

export const adminCategoryByIdGQL = `
  query($id: ID!) {
    categoryById(id: $id) {
      id
      name
      active
      description
      seo {
        metaTitle
        metaDescription
        keywords
        url
      }
    }
  }
`;
