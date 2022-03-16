export interface IDeckState {
  flip: boolean;
  count: number;
}

export enum EDackActionType {
  INCREMENT = 'INCREMENT',
  DECREMENT = 'DECREMENT',
  FLIP = 'FLIP',
}

export interface IDackAction {
  type: EDackActionType;
}
