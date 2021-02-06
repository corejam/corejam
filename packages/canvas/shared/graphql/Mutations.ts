export const PostCanvasGQL = `
    mutation createCanvas($canvasPageInput: CanvasPageInput!) {
        canvasPageCreate(canvasPageInput: $canvasPageInput) {
            id
            seo {
                url
            }
            canvas
        }
    }
`;
