import { selector } from 'lib/selectors';

const env = state => state.env;
export const isAuthorized = selector(env, e => e.get('isAuthorized'));
