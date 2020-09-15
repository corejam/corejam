

export const settingsGQL = `
  query {
    config {
      seo {
        metaTitle
        metaDescription
        keywords
        url
      }
      general {
        admin_email
      }
    }
  }
`;
