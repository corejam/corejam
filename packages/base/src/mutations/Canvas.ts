export const canvasOpenPeersGQL = `
  mutation canvasOpenPeers($id: String!, $peerInput: CanvasPeerInput!) {
    canvasOpenPeers(id: $id, peerInput: $peerInput) {
      key
      peers {
        hash
        offer
      }
    }
  }
`;

export const canvasClosePeersGQL = `
  mutation canvasClosePeers($id: String!) {
    canvasClosePeers(id: $id) {
      id
    }
  }
`;
