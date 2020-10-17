export const userRegisterMutationGQL = `
  mutation userRegister($data: RegisterInput!) {
    userRegister(data: $data) {
      id
      email
    }
  }
`;

export const userAuthenticateMutationGQL = `
  mutation userAuthenticate($email: String!, $password: String!) {
    userAuthenticate(email: $email, password: $password) {
      token
      user {
        id
        email
      }
    }
  }
`;

export const userTokenRefreshMutationGQL = `
  mutation userTokenRefresh {
    userTokenRefresh {
      token
      user {
        id
        email
      }
    }
  }
`;

export const userEditMutationGQL = `
  mutation userEdit($id: String!, $userInput: UserInput!) {
    userEdit(id: $id, userInput: $userInput) {
      id
      email
      active
    }
  }
`;

export const userAddMutationGQL = `
  mutation UserAdd($userCreateInput: UserCreateInput!) {
    userCreate(userCreateInput: $userCreateInput) {
      id
      email
      role
      active
    }
  }
`;

export const meGQL = `
    mutation {
        me {
            email
        }
    }
`