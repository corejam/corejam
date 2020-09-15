

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
  query($id: String!) {
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
