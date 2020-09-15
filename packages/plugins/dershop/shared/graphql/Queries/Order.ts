

export const ordersByCustomer = `
  query {
    ordersByCustomer {
      items {
        id
        price {
          gross
        }
        status
        address_shipping {
          city
          country
        }
      }
      lastPage
      currentPage
      totalItems
    }
  }
`;

export const orderById = `
  query OrderById($id: String!){
    orderById(id: $id) {
      id
      items {
        product {
          name
        }
        quantity
        price {
          tax_rate
          gross
          net
        }
      }
      price {
        net
        gross
      }
      user {
        firstName
        lastName
      }
      addressShipping {
        street
        city
      }
      addressBilling {
        street
        city
      }
      status
    }
  }
`