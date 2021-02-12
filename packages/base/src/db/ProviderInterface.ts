import { CoreModel } from "./CoreModel";

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
  create<T extends CoreModel>(model: CoreModel): Promise<T>;

  read<T extends CoreModel>(model: CoreModel, id: string | number): Promise<T | null>;

  update<T extends CoreModel>(model: CoreModel): Promise<T>;

  delete(model: CoreModel): Promise<Boolean>;

  count(): Promise<number>;

  createIndex(name: string, options?: any): Promise<Boolean>;

  deleteIndex(name: string): Promise<Boolean>;
}
