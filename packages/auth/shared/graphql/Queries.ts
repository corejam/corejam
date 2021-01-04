export const allUsersGQL = `
  query {
    allUsers {
      id
      email
      role
      active
      dateCreated
      dateUpdated
    }
  }
`;

export const userByIdGQL = `
  query UserById($id: ID!) {
    userById(id: $id) {
      id
      active
      email
      role
      dateCreated
      dateUpdated
    }
  }
`;

export const paginateUsersGQL = `
  query PaginateUsers($page: Int!, $size: Int!) {
    paginateUsers(page: $page, size: $size) {
      totalItems
      perPage
      currentPage
      lastPage
      items {
        id
        email
        role
        active
        dateCreated
        dateUpdated
      }
    }
  }
`;
