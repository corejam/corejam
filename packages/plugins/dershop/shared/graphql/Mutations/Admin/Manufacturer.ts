export const manufacturerEditGQL = `
  mutation ManufacturerEdit($id: ID!, $manufacturerInput: ManufacturerInput!) {
    manufacturerEdit(id: $id, manufacturerInput: $manufacturerInput) {
      name
      website
      description
    }
  }
`;

export const manufacturerEditSEOGQL = `
  mutation ManufacturerEditSEO($id: ID!, $seoInput: SEOInput!) {
    manufacturerEditSEO(id: $id, seoInput: $seoInput) {
      seo {
        metaDescription
        keywords
        metaTitle
        url
      }
    }
  }
`;

export const manufacturerCreateGQL = `
  mutation ManufacturerAdd($manufacturerInput: ManufacturerInput!) {
    manufacturerCreate(manufacturerInput: $manufacturerInput) {
      name
      website
      description
    }
  }
`;
