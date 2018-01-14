import I from 'immutable';
import * as Env from 'domain/env/envActions';

const emptyMap = new I.Map();
const CardsLog = emptyMap;

export const reducer = {
  log(state = CardsLog, action) {
    switch (action.type) {

      case Env.clearDB.success:
        return CardsLog;

      default:
        return state;
    }
  },
};
