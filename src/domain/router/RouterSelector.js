import { selector } from 'lib/selectors';
import { parseQuery } from './helpers';
// import { matchPath } from 'react-router-dom';

// function matchRoute(location) {
//   for ( let item of ROUTES) {
//     const match = matchPath(location.pathname, {
//       exact: ('exact' in item) ? item.exact : true,
//       strict: false,
//       ...item,
//     });
//     if (match !== null) {
//       return match;
//     }
//   }
//   return null;
// }


const routing = state => state.routing;
export const location = selector(routing, r => r.location);
export const search = selector(location, r => r.search);
export const query = selector(search, parseQuery);
export const state = selector(location, r => r.state);
export const prevLocation = selector(routing, r => r.prevLocation);
// export const match = createSelector(location, matchRoute);

export const locationIsChange = selector(prevLocation, location, (prev, current) => {
  if (prev.pathname !== current.pathname) return true;
  return prev.search !== current.search;
});
