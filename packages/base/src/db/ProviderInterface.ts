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
  create<Model extends CoreModel>(model: Model): Promise<Model>;

  read<Model extends CoreModel>(model: Model, id: string | number): Promise<Model | null>;

  filter<Model extends CoreModel>(model: Model, filter: { [key: string]: any }): Promise<Model[] | null>;

  update<Model extends CoreModel>(model: Model): Promise<Model>;

  delete<Model extends CoreModel>(model: Model): Promise<Boolean>;

  count(): Promise<number>;

  createIndex(name: string, options?: any): Promise<Boolean>;

  deleteIndex(name: string): Promise<Boolean>;
}
