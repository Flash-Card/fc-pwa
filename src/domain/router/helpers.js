import queryString from 'query-string';

export function parseQuery(search) {
  return queryString.parse(search, { arrayFormat: 'bracket' });
}
