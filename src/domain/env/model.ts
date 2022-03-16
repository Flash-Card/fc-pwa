import { IEnv, Action, EActionType } from './types';
import set from 'lodash/fp/set';

const init: IEnv = {
  version: '1.0',
  cardsInLesson: 3,
}

export const reducer = {
  env(state: IEnv = init, action: Action) {
    switch (action.type) {

      case EActionType.SET_VERSION:
        return set('version')(action.payload)(state);

      default:
        return state;
    }
  },
};
