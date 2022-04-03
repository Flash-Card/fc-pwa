import { Reducer } from 'react';

export interface IDeckState {
  flip: boolean;
  count: number;
  isEdit: boolean;
}

export enum EDackActionType {
  INCREMENT = 'INCREMENT',
  DECREMENT = 'DECREMENT',
  FLIP = 'FLIP',
  START_EDIT = 'START_EDIT',
  FINISH_EDIT = 'FINISH_EDIT',
  DELETE = 'DELETE',
  HIDE = 'HIDE',
  SHOW = 'SHOW',
}

export interface IDackAction {
  type: EDackActionType;
}

export type TDackReducer = Reducer<IDeckState, IDackAction>;

export function reducer(state: IDeckState, action: IDackAction) {
  switch (action.type) {
    case EDackActionType.INCREMENT:
      return { ...state, count: state.count + 1, flip: false };
    case EDackActionType.DECREMENT:
      return { ...state, count: state.count - 1, flip: false };
    case EDackActionType.FLIP:
      return { ...state, flip: !state.flip };
    case EDackActionType.START_EDIT:
      return { ...state, isEdit: true };
    case EDackActionType.FINISH_EDIT:
      return { ...state, isEdit: false };
    default:
      throw new Error();
  }
}

export const initialArg: IDeckState = {
  count: 0,
  flip: false,
  isEdit: false,
}

export function getInitialState(idx: number) {
  return {
    ...initialArg,
    count: idx > -1 ? idx : 0,
  }
}