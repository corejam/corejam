import { ID } from "../typings/DB";

/**
 * Base class of our ORM
 */
export abstract class CoreModel {
  /**
   * The unique id for this document
   */
  readonly id?: ID;
}
