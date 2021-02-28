import { Timestamp } from "./Utils";

export type ID = string | number;

export type DBDocument = {
  id: ID;
} & Timestamp;

export type ModelMeta = {
  unique?: Boolean,
  index?: Boolean
}