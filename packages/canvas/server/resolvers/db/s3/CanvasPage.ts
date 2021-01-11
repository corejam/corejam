import type { CanvasPage, CanvasPageDB, CanvasPeer, CanvasPeers } from "../../../../shared/types/Canvas";
import * as AWS from "aws-sdk";

AWS.config.update({
    credentials: {
        accessKeyId: process.env.S3_ACCESS_KEY_ID as string,
        secretAccessKey: process.env.S3_SECRET_ACCESS_KEY as string
    },
    apiVersion: "2020-12-01"
});

export function canvasPageByUrl(_slug: string): Promise<CanvasPageDB | null> {
    throw new Error("To implement");
}

export function allCanvasPages(): Promise<CanvasPageDB[]> {
    throw new Error("To implement");
}

export async function canvasPageCreate(canvasPageInput: CanvasPage): Promise<CanvasPageDB> {

    const s3 = await new AWS.S3.ManagedUpload({
        params: {
            Key: process.env.S3_KEY_PREFIX as string + canvasPageInput.seo.url,
            Body: JSON.parse(canvasPageInput.canvas),
            ContentDisposition: `inline; filename=${canvasPageInput.seo.url}`,
            Bucket: process.env.S3_BUCKET_NAME as string,
            ContentType: "text/html",
        }
    }).promise();

    console.log(s3);

    return {
        id: canvasPageInput.seo.url,
        canvas: canvasPageInput.canvas,
        seo: canvasPageInput.seo,
        dateCreated: new Date().toDateString(),
        dateUpdated: new Date().toDateString()
    };
}

export function canvasPageEdit(_id: string, _canvasPageInput: CanvasPage): Promise<CanvasPageDB> {
    throw new Error("To implement");
}

export function canvasPageById(_id: string): Promise<CanvasPageDB | null> {
    throw new Error("To implement");
}

export function canvasOpenPeers(_id: string, _peerInput: CanvasPeer): Promise<CanvasPeers> {
    throw new Error("To implement");
}

export function canvasClosePeers(_id: string): Promise<CanvasPage> {
    throw new Error("To implement");
}

export function canvasPollPeers(_id: string): Promise<CanvasPeers | null> {
    throw new Error("To implement");
}
