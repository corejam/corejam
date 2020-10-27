export const allManufacturersGQL = `
  query {
    allManufacturers {
      id
      name
      website
      seo {
        url
      }
    }
  }
`;

export const paginateManufacturersGQL = `
  query PaginateManufacturers($page: Int!, $size: Int!) {
    paginateManufacturers(page: $page, size: $size) {
      totalItems
      perPage
      currentPage
      lastPage
      items {
        id
        name
        website
        seo {
          url
        }
      }
    }
  }
`;

export const manufacturerById = `
  query ManufacturerById($id: ID!) {
    manufacturerById(id: $id) {
      id
      name
      website
      products {
        items {
          id
          name
          active
          description
          ean
          manufacturer_number
          promoted
          sku
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
      seo {
        url
      }
    }
  }
`;
