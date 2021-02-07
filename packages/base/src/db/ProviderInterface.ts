import { DBDocument } from "../typings/DB";

/**
 * This is the interface for database implementations.
 *
 * If you want to add support for a new database for
 * corejam applications you need to implement this interface and
 * make sure the test suite runs.
 *
 * All corejam applications should work out of the box.
 *
 */
export interface ProviderInterface {
  create(document: object): Promise<DBDocument>;

  read(id: string | number): Promise<DBDocument | null>;

  update(document: DBDocument): Promise<DBDocument>;

  delete(document: DBDocument): Promise<Boolean>;

  count(): Promise<number>;

  createIndex(name: string, options?: any): Promise<Boolean>;

  deleteIndex(name: string): Promise<Boolean>;
}
