export const updateUserGQL = `
    mutation UpdateUser($id: String!, $userInput: UserInput!) {
        userEdit(id: $id, userInput: $userInput) {
            firstName
            lastName
            email
        }
    }
`
export const meGQL = `
    mutation {
        me {
            firstName
            lastName
            email
        }
    }
`