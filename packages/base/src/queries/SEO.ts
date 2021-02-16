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
        }
        images {
          src
        }
        deliverability {
          stock
        }
        seo {
          url
        }
      }
      category {
        name
        products {
          items {
            name
            seo {
              url
            }
          }
        }
      }
      manufacturer {
        name
        products {
          items {
            name
            seo {
              url
            }
          }
        }
      }
      canvasPage {
        id
        seo {
          url
        }
        canvas
      }
    }
  }
`;
