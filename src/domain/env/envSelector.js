import { selector } from 'lib/selectors';

const env = state => state.env;
export const isAuthorized = selector(env, e => e.get('isAuthorized'));
export const gitHub = selector(env, e => e.get('gitHub').toJS());
export const fireBase = selector(env, e => e.get('fireBase').toJS());
export const user = selector(env, e => e.get('user'));
