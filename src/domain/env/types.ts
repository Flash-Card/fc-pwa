export enum EActionType {
  SET_VERSION = 'GET_VERSION',
}

export interface ISetVersion {
  type: typeof EActionType.SET_VERSION,
  payload: string;
}

export type Action = ISetVersion

export interface IEnv {
  version: string;
  cardsInLesson: number;
}
