import "reflect-metadata";
import { getDb } from "../PluginManager";
import { ID, ModelMeta } from "../typings/DB";
import { DocumentNotFound } from "./Exceptions/DocumentNotFound";
import { Corejam } from "./ModelDecorator";
import { getModelMeta, modelMeta } from "./ModelManager";
import { ParsedRelation, Relation } from "./Relation";

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
  @Corejam({ unique: true })
  id!: ID;

  @Corejam()
  dateCreated: Date = new Date();

  @Corejam()
  dateUpdated: Date = new Date();

  /**
   * We generate the associated collections
   * from the model name
   */
  abstract readonly collection: string;

  getModelName() {
    return this.collection;
  }

  getId(): ID {
    if (!this.exists()) throw new DocumentNotFound(this);

    return this.id;
  }

  static async getById<T extends CoreModel>(this: Constructor<T>, id: ID): Promise<T> {
    const instance = new this() as T;
    instance.id = id;

    const res = await getDb().read(instance, id);

    if (!res) {
      throw new DocumentNotFound(instance);
    }

    return res;
  }

  /**
   * Filter on this instance by parameters
   */
  static async filter<T extends CoreModel>(this: Constructor<T>, filter: { [key: string]: any }): Promise<T[] | null> {
    const instance = new this() as T;

    return await getDb().filter(instance, filter);
  }

  static async list<T extends CoreModel>(this: Constructor<T>): Promise<T[]> {
    const instance = new this() as T;

    return await getDb().list(instance);
  }

  async preCreate(): Promise<this> {
    return this;
  }

  async create(): Promise<this> {
    await this.preCreate();

    return await getDb().create(this);
  }

  async preUpdate(): Promise<this> {
    return this;
  }

  async update(): Promise<this> {
    await this.preUpdate();

    return await getDb().update(this);
  }

  async delete(): Promise<Boolean> {
    const res = await getDb().delete(this);

    if (res) {
      //@ts-ignore TODO this has to be handled better
      this.id = undefined;
    }

    return res;
  }

  /**
   * Check if this document exists. As keys are only ever
   * set during the remote creation process we can be sure that a document is
   * exists.
   */
  exists(): Boolean {
    return this.id !== undefined;
  }

  /**
   * Create or update a record.
   */
  async save(): Promise<this> {
    if (this.exists()) {
      return this.update();
    }

    return this.create();
  }

  /**
   * Should instead use new() constructor to set readonly attributes
   * on Model instance
   */
  public async assignData(data: any): Promise<this> {
    const meta = this.getMeta();

    for (const field of Object.keys(meta)) {
      if (meta[field].relation && data[field]) {
        /**
         * Hydrate the relation
         *
         * TODO in future this could be done by a magic get() and
         * only hydrate when the element is actually being accessed (lazy load). This could
         * potentially save alot of reads to the DB. PR's welcome
         */
        const relationStatic = new meta[field].relation().constructor;

        if (Array.isArray(data[field])) {
          this[field] = await Promise.all(
            data[field].map(async (relation: ParsedRelation) => {
              return await relationStatic.getById(relation.id);
            })
          );
        } else {
          this[field] = await relationStatic.getById(data[field].id);
        }

        continue;
      }

      //Just assign the value
      this[field] = data[field];
    }

    //If we have an id lets set it
    if (data.id) this.id = data.id;

    return this;
  }

  /**
   * Collect the names of all the attributes
   * we have decorated to be included in data
   */
  getDataFields(): string[] {
    return Object.keys(this.getMeta());
  }

  /**
   * Get all the meta data for our field definitions on
   * this model.
   *
   * Use ModelManager as singleton store for meta info.
   */
  getMeta() {
    if (getModelMeta(this)) return getModelMeta(this) as ModelMeta;

    let fields: { [key: string]: { [key: string]: ModelMeta } } = {};

    let target = Object.getPrototypeOf(this);
    while (target != Object.prototype) {
      const childFields = Reflect.getOwnMetadata("Corejam", target) || [];
      fields = { ...fields, ...childFields };
      target = Object.getPrototypeOf(target);
    }

    //Merge CoreModel attributes in
    const modelMeda = {
      ...fields["CoreModel"],
      ...fields[this.constructor.name],
    };

    modelMeta.set(this.constructor.name, modelMeda);

    return modelMeda;
  }

  /**
   * Get our current objects data values
   * defined through decorated attributes
   *
   * To write data to a db use model.getDataForWrite()
   */
  getData(): object {
    const data = {};

    this.getDataFields().map((field) => {
      data[field] = this[field];
    });

    return data;
  }

  //Transform data for writing
  getDataForWrite(): object {
    const data = this.getData();
    const meta = this.getMeta();

    Object.keys(meta).map((key) => {
      if (meta[key].relation) {
        data[key] = new Relation(data[key]).parse();
      }
    });

    return data;
  }
}
