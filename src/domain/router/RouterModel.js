import I from 'immutable';
import { parseQuery } from './helpers';
import { LOCATION_CHANGE } from 'react-router-redux';

const State = new I.Map({
  location: new I.Map(),
});

export const reducer = {
  routing(state = State, action) {
    switch (action.type) {

      case LOCATION_CHANGE:
        return state
          .set('location', I.fromJS(action.payload).set('query'))
          .setIn(['location', 'query'], I.fromJS(parseQuery(action.payload.search)))
          .set('prevLocation', state.get('location'));

      default:
        return state;
    }
  },
};
