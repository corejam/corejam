export const getObjectFromURL = `
  query ObjectFromURL($url: String!) {
    objectFromURL(url: $url) {
      article {
        title
        coverImage
        content
        seo {
          url
          metaTitle
          metaDescription
        }
    }
  }
`;

export const getSeoIndex = `
  query {
    getSEOIndex
  }
`