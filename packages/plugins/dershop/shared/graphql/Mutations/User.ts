export const updateUserGQL = `
    mutation UpdateUser($id: String!, $userInput: UserInput!) {
        userEdit(id: $id, userInput: $userInput) {
            firstName
            lastName
            email
        }
    }
`