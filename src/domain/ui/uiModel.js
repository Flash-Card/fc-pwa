import I from 'immutable';

import * as A from './uiActions.js';

const UI = I.fromJS({
  menu: {
    isOpen: false,
  },
});


export const reducer = {
  ui(state = UI, action) {

    switch (action.type) {

      case A.menuAction.type:
        return state
          .setIn(['menu', 'isOpen'], action.payload);

      default:
        return state;
    }
  },
};
