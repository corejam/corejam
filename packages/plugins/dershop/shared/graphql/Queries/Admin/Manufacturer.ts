export const adminAllManufacturersGQL = `
  query {
    allManufacturers {
      id
      name
      website
    }
  }
`;

export const adminManufacturerByIdGQL = `
  query($id: ID!) {
    manufacturerById(id: $id) {
      id
      name
      website
      description
      seo {
        url
        metaTitle
        metaDescription
        keywords
      }
    }
  }
`;

export const adminGetManufacturersForSelectGQL = `
  query {
    manufacturersForSelect {
      id
      name
    }
  }
`;
