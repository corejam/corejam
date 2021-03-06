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
  mutation userEdit($id: ID!, $userInput: UserInput!) {
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

export const userUpdatePasswordMutationGQL = `
  mutation UserUpdatePassword($userPasswordInput: UpdatePasswordInput!) {
    userUpdatePassword(passwordInput: $userPasswordInput)
  }
`;

export const userUpdateGQL = `
  mutation userUpdate($userInput: UserUpdateInput!) {
    userUpdate(userUpdateInput: $userInput) {
      id
      email
    }
  }
`;

export const meGQL = `
    mutation {
        me {
            email
        }
    }
`;

export const verifyEmailGQL = `
  mutation UserVerify($email: String!, $token: String!) {
    userVerify(email: $email, token: $token ) {
      id
      email
      role
      status
      active
    }
  } 
`;

export const requestPasswordResetGQL = `
  mutation RequestPasswordReset($email: String!) {
    userRequestPasswordReset(email: $email)
  } 
`;

export const passwordResetGQL = `
  mutation PasswordReset($token: String!, $resetInput: ResetPasswordInput!) {
    userResetPassword(token: $token, resetInput: $resetInput)
  } 
`;
