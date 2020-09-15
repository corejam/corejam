

export const categoryEditGQL = `
  mutation CategoryEdit($id: String!, $categoryInput: CategoryInput!) {
    categoryEdit(id: $id, categoryInput: $categoryInput) {
      name
      description
    }
  }
`;

export const categoryEditSEOGQL = `
  mutation CategoryEditSEO($id: String!, $seoInput: SEOInput!) {
    categoryEditSEO(id: $id, seoInput: $seoInput) {
      seo {
        metaDescription
        keywords
        metaTitle
        url
      }
    }
  }
`;

export const categoryAddGQL = `
  mutation CategoryAdd($categoryInput: CategoryInput!) {
    categoryCreate(categoryInput: $categoryInput) {
      name
      description
    }
  }
`;
