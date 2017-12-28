import I from 'immutable';
import { createSelector } from 'reselect';
import queryString from 'query-string';
import { LOCATION_CHANGE } from 'react-router-redux';
import { matchPath } from 'react-router-dom';

const ROUTES = [
  {
    path: '/my-team/:hostId/member/:memberId/:userId',
  },
  {
    path: '/my-team/:hostId/invite-member/:roleId',
  },
  {
    path: '/my-team/:hostId?',
  },
  {
    path: '/booking/info/:bookingId',
  },
  {
    path: '/booking/add-time/:bookingId',
  },
  {
    path: '/notifications/accept-invitation/:bookingId',
  },
  {
    path: '/notifications/invitation-expired/:bookingId',
  },
  {
    path: '/booking/info/:bookingId/invite-member/:hostId/:roleId',
  },
];

function matchRoute(location) {
  for ( let item of ROUTES) {
    const match = matchPath(location.pathname, {
      exact: ('exact' in item) ? item.exact : true,
      strict: false,
      ...item,
    });
    if (match !== null) {
      return match;
    }
  }
  return null;
}

const routing = state => state.routing;
export const location = createSelector(routing, r => r.location);
export const search = createSelector(location, r => r.search);
export const query = createSelector(search, s => queryString.parse(s, { arrayFormat: 'bracket' }));
export const state = createSelector(location, r => r.state);
export const prevLocation = createSelector(routing, r => r.prevLocation);
export const match = createSelector(location, matchRoute);

export const locationIsChange = createSelector(prevLocation, location, (prev, current) => {
  if (prev.pathname !== current.pathname) return true;
  return prev.search !== current.search;
});

const State = new I.Map({
  location: new I.Map(),
});

function parseQuery(search) {
  return queryString.parse(search, { arrayFormat: 'bracket' });
}

export const reducer = {
  routing(state = State, action) {
    switch (action.type) {

      case LOCATION_CHANGE:
        return state
          .set('location', I.fromJS(action.payload).set('query'))
          .setIn(['location', 'query'], parseQuery(action.payload.search))
          .set('prevLocation', state.get('location'));

      default:
        return state;
    }
  },
};
