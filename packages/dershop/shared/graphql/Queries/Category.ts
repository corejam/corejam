export const allCategoriesGQL = `
  query {
    allCategories {
      id
      name
      seo {
        url
      }
    }
  }
`;

export const paginateCategoriesGQL = `
  query PaginateCategories($page: Int!, $size: Int!) {
    paginateCategories(page: $page, size: $size) {
      totalItems
      perPage
      currentPage
      lastPage
      items {
        id
        name
        seo {
          url
        }
      }
    }
  }
`;

export const categoryById = `
  query CategoryById($id: ID!) {
    categoryById(id: $id) {
      id
      name
      seo {
        url
      }
      products {
        totalItems
        perPage
        currentPage
        lastPage
        items {
          id
          name
          active
          dateCreated
          dateUpdated
          description
          ean
          manufacturer_number
          promoted
          sku
          seo {
            url
          }
        }  
      }
    }
  }
`;
