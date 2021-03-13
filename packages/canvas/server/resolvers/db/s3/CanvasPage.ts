import * as AWS from "aws-sdk";
import { CanvasPage } from "../../../../shared/types/Canvas";
import { Canvas } from "../../../models/Canvas";

AWS.config.update({
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY as string,
  },
  apiVersion: "2020-12-01",
});

export function canvasPageByUrl(_slug: string): Promise<Canvas | null> {
  throw new Error("To implement");
}

export function allCanvasPages(): Promise<Canvas[]> {
  throw new Error("To implement");
}

export async function canvasPageCreate(canvasPageInput: CanvasPage): Promise<Canvas> {
  const s3 = await new AWS.S3.ManagedUpload({
    params: {
      Key: (process.env.S3_KEY_PREFIX as string) + canvasPageInput.seo.url,
      Body: JSON.parse(canvasPageInput.canvas),
      ContentDisposition: `inline; filename=${canvasPageInput.seo.url}`,
      Bucket: process.env.S3_BUCKET_NAME as string,
      ContentType: "text/html",
    },
  }).promise();

  console.log(s3);

  return {
    id: canvasPageInput.seo.url,
    canvas: canvasPageInput.canvas,
    seo: canvasPageInput.seo,
  } as Canvas;
}

export function canvasPageEdit(_id: string, _canvasPageInput: CanvasPage): Promise<Canvas> {
  throw new Error("To implement");
}

export function canvasPageById(_id: string): Promise<Canvas | null> {
  throw new Error("To implement");
}
