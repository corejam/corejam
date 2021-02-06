export const updateConfigGQL = `
  mutation UpdateConfig($configInput: ConfigGeneralInput!) {
    updateConfig(configInput: $configInput) {
      general {
        admin_email
      }
    }
  }
`;

export const updateConfigSEOGQL = `
  mutation updateConfigSEO($seoInput: SEOInput!) {
    updateConfigSEO(seoInput: $seoInput) {
      seo {
        metaTitle
        metaDescription
        url
        keywords
      }
    }
  }
`;
