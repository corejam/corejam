export const getObjectFromURL = `
  query ObjectFromURL($url: String!) {
    objectFromURL(url: $url) {
      product {
        id
        sku
        ean
        name
        description
        price {
          gross
          net
        }
        images {
          src
        }
        active
        promoted
        manufacturer_number
        deliverability {
          stock
        }
        seo {
          url
          metaTitle
          metaDescription
          keywords
        }
      }
      category {
        name
        seo {
          url
          metaTitle
          metaDescription
        }
        products {
          sidebar {
            categories {
              name
              itemCount
              url
            }
            brands {
              name
              url
              itemCount
            }
          }
          totalItems
          perPage
          currentPage
          lastPage
          items {
            id
            name
            images {
              src
            }
            price {
              net
            }
            seo {
              url
            }
          }
    
        }
      }
      manufacturer {
        name
        description
        products {
          sidebar {
            categories {
              name
              itemCount
              url
            }
            brands {
              name
              url
              itemCount
            }
          }
          items {
            name
            images {
              src
            }
            price {
              net
            }
            seo {
              url
              metaTitle
              metaDescription
            }    
          }
        }
        seo {
          url
          metaTitle
          metaDescription
          keywords
        }
      }
      canvasPage {
        id
        seo {
          url
          metaTitle
          metaDescription
        }
        canvas
      }
    }
  }
`;

export const getSeoIndex = `
  query {
    getSEOIndex
  }
`;
