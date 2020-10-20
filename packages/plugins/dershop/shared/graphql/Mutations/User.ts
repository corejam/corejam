export const updateUserGQL = `
    mutation UpdateUser($id: ID!, $userInput: UserInput!) {
        userEdit(id: $id, userInput: $userInput) {
            firstName
            lastName
            email
        }
    }
`;
export const meGQL = `
    mutation {
        me {
            firstName
            lastName
            email
        }
    }
`;
