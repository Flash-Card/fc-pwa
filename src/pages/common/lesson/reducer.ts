import { IState, IAction, EActionType, IQuestion } from './types';

export const getInitialState = (item: IQuestion) => ({
  item,
});

export function reducer(state: IState, action: IAction) {
  switch(action.type) {
    case EActionType.SET_VALIDATION_STATUS:
      return { ...state, status: action.payload };

    case EActionType.SET_QUESTION:
      return { ...state, item: action.payload };

    default:
      return state;
  }
}
