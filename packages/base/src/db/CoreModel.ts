import "reflect-metadata";
import { getDb } from "../PluginManager";
import { ID } from "../typings/DB";

export type Constructor<CoreModel> = {
  new (): CoreModel;
};

/**
 * Base class of our ORM
 */
export abstract class CoreModel {
  /**
   * The unique id for this document
   */
  id?: ID;

  /**
   * We generate the associated collections
   * from the model name
   */
  abstract readonly collection: string;

  getModelName() {
    return this.collection;
  }

  static async getById<T extends CoreModel>(this: Constructor<T>, id: string): Promise<T | null> {
    try {
      const instance = new this() as T;
      instance.id = id;

      return await getDb().read(instance, id);
    } catch (e) {
      return null;
    }
  }

  async create(): Promise<this> {
    return await getDb().create(this);
  }

  async delete(): Promise<Boolean> {
    return await getDb().delete(this);
  }

  /**
   * Check if this document exists. As keys are only ever
   * set during the remote creation process we can be sure that a document is
   * exists.
   */
  exists(): Boolean {
    return this.id !== undefined;
  }

  async update(): Promise<this> {
    return await getDb().update(this);
  }

  /**
   * Should instead use new() constructor to set readonly attributes
   * on Model instance
   */
  public assignData(data: any): this {
    this.getDataFields().map((field) => {
      this[field] = data[field];
    });

    return this;
  }

  /**
   * Collect the names of all the attributes
   * we have decorated to be included in data
   */
  getDataFields(): string[] {
    const fields: string[] = [];
    let target = Object.getPrototypeOf(this);
    while (target != Object.prototype) {
      const childFields = Reflect.getOwnMetadata("CoreData", target) || [];
      fields.push(...childFields);
      target = Object.getPrototypeOf(target);
    }

    return fields;
  }

  /**
   * Get our current objects data values
   * defined through
   */
  getData(): object {
    const data = {};

    this.getDataFields().map((field) => {
      data[field] = this[field];
    });

    return data;
  }
}
