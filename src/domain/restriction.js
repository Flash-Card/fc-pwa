import {
  makeDictionary,
  mergeMask,
  check,
  createPolicies,
  arrayFilter,
} from 'lib/policy';
import { selector } from 'lib/selectors';
import * as cardsSelectors from 'domain/cards/cardsSelector';

const RIGHTS = {
  LEXICON_IS_EXIST: 'LEXICON_IS_EXIST',
  SETS_IS_LOADED: 'SETS_IS_LOADED',
};

const dictionary = makeDictionary(Object.keys(RIGHTS));


export const myRestriction = selector(
  cardsSelectors.lexicon,
  cardsSelectors.setsLoadedList,
  (l, s) =>
    mergeMask(dictionary)(
      []
        .concat(l.size ? [RIGHTS.LEXICON_IS_EXIST] : [])
        .concat(s.size ? [RIGHTS.SETS_IS_LOADED] : [])
      ,
    ),
);

const policy = (...arr) => createPolicies(dictionary, arr);

export const isGranted = (state) => (lvl) => check(lvl, myRestriction(state));

export { arrayFilter };

export const SETS_IS_LOADED = policy(RIGHTS.SETS_IS_LOADED);
export const LEXICON_IS_EXIST = policy(RIGHTS.LEXICON_IS_EXIST);

export const MENU_QUIZ = policy(RIGHTS.LEXICON_IS_EXIST);
