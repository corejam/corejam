import { Timestamp } from "./Utils";

export type Image = Timestamp & {
  src: string;
  mimetype: string;
  alt?: string;
};

export type ImageInput = Image;
