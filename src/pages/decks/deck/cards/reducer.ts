import { Reducer } from 'react';

export interface IDeckState {
  flip: boolean;
  count: number;
  isEdit: boolean;
  isTransfering: boolean;
}

export enum ECardActionType {
  INCREMENT = 'INCREMENT',
  DECREMENT = 'DECREMENT',
  FLIP = 'FLIP',
  START_EDIT = 'START_EDIT',
  FINISH_EDIT = 'FINISH_EDIT',
  DELETE = 'DELETE',
  HIDE = 'HIDE',
  SHOW = 'SHOW',
  SET_COUNTER = 'SET_COUNTER',
  START_TRANSFER = 'START_TRANSFER',
  FINISH_TRANSFER = 'FINISH_TRANSFER',
}

interface ISetCounter {
  type: typeof ECardActionType.SET_COUNTER;
  payload: number;
}

export function setCounter(counter: number): ISetCounter {
  return {
    type: ECardActionType.SET_COUNTER,
    payload: counter,
  }
}

export type IDackAction = {
  type: Exclude<ECardActionType, ECardActionType.SET_COUNTER>;
} | ISetCounter;

export type TDackReducer = Reducer<IDeckState, IDackAction>;

export function reducer(state: IDeckState, action: IDackAction) {
  switch (action.type) {
    case ECardActionType.INCREMENT:
      return { ...state, count: state.count + 1, flip: false };
    case ECardActionType.DECREMENT:
      return { ...state, count: state.count - 1, flip: false };
    case ECardActionType.FLIP:
      return { ...state, flip: !state.flip };
    case ECardActionType.START_EDIT:
      return { ...state, isEdit: true };
    case ECardActionType.FINISH_EDIT:
      return { ...state, isEdit: false };
    case ECardActionType.SET_COUNTER:
      return { ...state, count: action.payload };
    case ECardActionType.START_TRANSFER:
      return { ...state, isTransfering: true };
    case ECardActionType.FINISH_TRANSFER:
      return { ...state, isTransfering: false };
    default:
      throw new Error();
  }
}

export const initialArg: IDeckState = {
  count: 0,
  flip: false,
  isEdit: false,
  isTransfering: false,
}

export function getInitialState(idx: number) {
  return {
    ...initialArg,
    count: idx > -1 ? idx : 0,
  }
}