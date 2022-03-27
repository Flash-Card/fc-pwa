import { Reducer } from 'react';

export interface IQuestion {
  question: string;
  answer: string;
}

export interface IAnswer {
  answer: string;
}

export interface IState {
  item: IQuestion,
  status?: boolean | undefined;
}

export enum EActionType {
  SET_VALIDATION_STATUS = 'SET_VALIDATION_STATUS',
  SET_QUESTION = 'SET_QUESTION',
}

interface ISetValidationStatus {
  type: EActionType.SET_VALIDATION_STATUS;
  payload: boolean | undefined;
}

interface ISetQuestion {
  type: EActionType.SET_QUESTION;
  payload: IQuestion;
}

export type IAction = ISetValidationStatus | ISetQuestion;
export type TReducer = Reducer<IState, IAction>;
