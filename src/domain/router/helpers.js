import I from "immutable";
import queryString from 'query-string';
import { routesById } from './routes';

export function parseQuery(search) {
  return queryString.parse(search, { arrayFormat: 'bracket' });
}

export const cardPath = (el = new I.List()) => routesById['/memoize/:set/:key'].path.pathMaker({ set: el.get(0), key: el.get(1) });

