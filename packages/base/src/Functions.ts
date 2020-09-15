import { Timestamp } from "./typings/Utils";

export function updateDates(object?: Timestamp): Timestamp {
  const current = new Date().toISOString();

  if (object) {
    const timestamp = {
      dateCreated: object.dateCreated,
      dateUpdated: current,
    };

    return timestamp;
  }

  return {
    dateCreated: current,
    dateUpdated: current,
  };
}
