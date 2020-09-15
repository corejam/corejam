

export const userByToken = `
  query {
    userByToken {
      id
      firstName
      lastName
      email
      telephone
      role
      active
      address {
        street
        street_2
        city
        state
        zipCode
        country
      }
    }
  }
`;
