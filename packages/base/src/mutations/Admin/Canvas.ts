export const updateCanvasPage = `
  mutation UpdateCanvasPage($id: String!, $canvasPage: CanvasPageInput!) {
    canvasPageEdit(id: $id, canvasPage: $canvasPage) {
      seo {
        url
      }
      canvas
    }
  }
`;
