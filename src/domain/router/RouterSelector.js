import I from 'immutable';
import { selector } from 'lib/selectors';
import { parseQuery } from './helpers';

const routing = state => state.routing;
export const location = selector(routing, r => r.get('location'));
export const search = selector(location, r => r.get('search'));
export const query = selector(search, s => I.fromJS(parseQuery(s)));
export const state = selector(location, r => r.get('state'));
export const prevLocation = selector(routing, r => r.get('prevLocation'));

export const locationIsChange = selector(prevLocation, location, (prev, current) => {
  if (!I.is(prev.get('pathname'), current.get('pathname'))) return true;
  return prev.get('search') !== current.get('search');
});
