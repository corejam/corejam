export const p2pCreate = `
  mutation P2pCreate($pl: P2pCreateInput!) {
    p2pCreate(p2pCreateInput: $userCreateInput) {
      string
    }
  }
`;
