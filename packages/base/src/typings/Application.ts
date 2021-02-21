/**
 * Definition of functionalities a Corejam Application provides
 */
export type CorejamApplication = {
  resolvers?: {
    Query: {
      [key: string]: (obj: any, args: any, ctx: any) => void;
    };
    Mutation: {
      [key: string]: (obj: any, args: any, ctx: any) => void;
    };
    [key: string]: {
      [key: string]: (obj: any, args: any, ctx: any) => void;
    };
  };

  /**
   * If anything needs to be initialized with the server
   * this can be used.
   */
  init?(): void;

  /**
   * Listeners that get registered from an application
   */
  listens?: [];

  /**
   * Events that this application emmits
   */
  emits?: string[];

  /**
   * Schemas that come with this application without file extension.
   * Example: schema.graphql is listed as ['schema']
   */
  schemas?: string[];
};
