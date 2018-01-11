import I from 'immutable';
import * as A from './envActions';

const emptyMap = new I.Map();

export const reducer = {
  env(state = emptyMap, action) {
    switch (action.type) {

      case A.signIn.success:
        return state
          .set('user', action.payload)
          .set('isAuthorized', true);

      case A.signOut.success:
        return state
          .set('user', emptyMap)
          .set('isAuthorized', false);

      default:
        return state;
    }
  },
};
