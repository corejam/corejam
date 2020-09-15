export const orderCreateGQL = `
  mutation orderCreate($orderInput: OrderInput!) {
    orderCreate(orderInput: $orderInput) {
      id
      user {
        email
        firstName
        lastName
      }
      status
      dateCreated
      addressBilling {
        street
        street_2
        city
        zipCode
        country
        state
      }
      addressShipping {
        street
        street_2
        city
        zipCode
        country
        state
      }
      price {
        net
        gross
      }
    }
  }
`;
