import { asyncAction } from 'lib/action';

export const signIn = asyncAction('auth/SIGN_IN');
export const signOut = asyncAction('auth/SIGN_OUT');
