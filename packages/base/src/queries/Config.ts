

export const getSeoConfigGQL = `
  query {
    config {
      seo {
        title
        description
      }
    }
  }
`;

export const getLayoutConfigGQL = `
  query {
    config {
      layout {
        header
        footer
      }
    }
  }
`;
