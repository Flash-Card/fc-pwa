import { Reducer } from 'react';


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

export type TDackReducer = Reducer<IDeckState, IDackAction>;

export function reducer(state: IDeckState, action: IDackAction) {
  switch (action.type) {
    case EDackActionType.INCREMENT:
      return { count: state.count + 1, flip: false };
    case EDackActionType.DECREMENT:
      return { count: state.count - 1, flip: false };
    case EDackActionType.FLIP: {
      return { ...state, flip: !state.flip };
    }
    default:
      throw new Error();
  }
}

export const initialArg = {
  count: 0,
  flip: false,
}