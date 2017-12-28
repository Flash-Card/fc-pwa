import I from 'immutable';

import * as A from './uiActions.js';

const UI = I.fromJS({
  menu: {
    isOpen: false,
    list: [
      { name: 'home', path: '/', title: 'home' },
      { name: 'memoize', path: '/memoize', title: 'memoize' },
      { name: 'quiz', path: '/quiz', title: 'quiz' },
      { name: 'create',  path: '/create', title: 'create card' },
    ],
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
