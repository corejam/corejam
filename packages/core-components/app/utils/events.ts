export enum FlashTypes {
  SUCCESS = "success",
  WARNING = "warning",
  INFO = "warning",
  ERROR = "error",
}

export type FlashEventType = {
  type: FlashTypes;
  msg: string;
};

export class FlashEvent<FlashEventType> extends CustomEvent<FlashEventType> {
  constructor(type: FlashTypes = FlashTypes.SUCCESS, msg: string) {
    super("corejam:flash", { detail: { type, msg } } as CustomEventInit);
  }
}
