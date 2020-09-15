export const productByUrlGQL = `
  query($url: String!) {
    productByUrl(url: $url) {
      id
      name
      description
      images {
        src
        alt
      }
      sku
      price {
        gross
      }
      seo {
        url
      }
      deliverability {
        stock
      }
    }
  }
`;

export const allProductsGQL = `
  query {
    allProducts {
      id
      name
      manufacturer {
        data {
          name
          seo {
            url
          }
        }
      }
      categories {
        name
        seo {
          url
        }
      }
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
`;

export const paginateProductsGQL = `
  query PaginateProducts($page: Int!, $size: Int!) {
    paginateProducts(page: $page, size: $size) {
      totalItems
      perPage
      currentPage
      lastPage
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
`;

export const searchProductsGQL = `
  query SearchProducts($search: String!, $page: Int!, $size: Int!) {
    productSearch(search: $search, page: $page, size: $size) {
      totalItems
      perPage
      currentPage
      lastPage
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
`;
