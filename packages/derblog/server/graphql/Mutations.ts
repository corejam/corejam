

export const derblogCreate = `
  mutation DerblogCreate($pl: DerblogCreateInput!) {
    derblogCreate(derblogCreateInput: $userCreateInput) {
      string
    }
  }
`;
