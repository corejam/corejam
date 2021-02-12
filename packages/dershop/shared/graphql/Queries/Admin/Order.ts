export const adminAllOrdersGQL = `
  query {
    allOrders {
      id
      user {
        email
        firstName
        lastName
      }
      price {
        gross
      }
      items {
        product {
          id
        }
      }
      status
      addressShipping {
        city
        country
      }
      dateCreated
    }
  }
`;

export const adminPaginateOrdersGQL = `
  query PaginateOrders($page: Int!, $size: Int!) {
    paginateOrders(page: $page, size: $size) {
      totalItems
      perPage
      currentPage
      lastPage
      items {
        id
        user {
          email
          firstName
          lastName
        }
        items {
          product {
            id
          }
        }
        price {
          gross
        }
        status
        addressShipping {
          city
          country
        }
        dateCreated
      }
    }
  }
`;
