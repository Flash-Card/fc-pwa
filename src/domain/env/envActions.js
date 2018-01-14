import { asyncAction, action } from 'lib/action';

export const signIn = asyncAction('auth/SIGN_IN');
export const signOut = asyncAction('auth/SIGN_OUT');
export const version = action('env/VERSION');
export const clearDB = asyncAction('env/CLEAR_DB');
