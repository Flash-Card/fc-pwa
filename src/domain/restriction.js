import {
  makeDictionary,
  mergeMask,
  check,
  createPolicies,
  arrayFilter,
} from 'lib/policy';
import { selector } from 'lib/selectors';
import * as cards from 'domain/cards/cardsSelector';
import * as env from 'domain/env/envSelector';

const RIGHTS = {
  LEXICON_IS_EXIST: 'LEXICON_IS_EXIST',
  SETS_IS_LOADED: 'SETS_IS_LOADED',
  IS_AUTHORIZED: 'IS_AUTHORIZED',
  IS_NOT_AUTHORIZED: 'IS_NOT_AUTHORIZED',
};

const dictionary = makeDictionary(Object.keys(RIGHTS));


export const myRestriction = selector(
  cards.lexicon,
  cards.setsLoadedList,
  env.isAuthorized,
  (l, s, e) =>
    mergeMask(dictionary)(
      []
        .concat(l.size ? [RIGHTS.LEXICON_IS_EXIST] : [])
        .concat(s.size ? [RIGHTS.SETS_IS_LOADED] : [])
        .concat([e ? RIGHTS.IS_NOT_AUTHORIZED : RIGHTS.IS_NOT_AUTHORIZED])
      ,
    ),
);

const policy = (...arr) => createPolicies(dictionary, arr);

export const isGranted = state => lvl => check(lvl, myRestriction(state));

export { arrayFilter };

export const SETS_IS_LOADED = policy(RIGHTS.SETS_IS_LOADED);
export const LEXICON_IS_EXIST = policy(RIGHTS.LEXICON_IS_EXIST);

export const MENU_QUIZ = policy(RIGHTS.LEXICON_IS_EXIST);
export const MENU_AUTH = policy(RIGHTS.IS_AUTHORIZED);
