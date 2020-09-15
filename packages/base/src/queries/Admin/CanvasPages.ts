export const adminAllCanvasPagesGQL = `
  query {
    allCanvasPages {
      id
      canvas
      seo {
        url
      }
    }
  }
`;

export const canvasPagesPollPeersGQL = `
  query CanvasPagesPollPeers($id: String!) {
    canvasPollPeers(id: $id) {
      key
      peers {
        hash
        offer
      }
    }
  }
`;
