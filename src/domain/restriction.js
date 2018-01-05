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
};

const dictionary = makeDictionary(Object.keys(RIGHTS));


export const myRestriction = selector(cardsSelectors.lexicon, l =>
  mergeMask(dictionary)(
    [].concat(l.size ? [RIGHTS.LEXICON_IS_EXIST] : []),
  ),
);

const policy = (...arr) => createPolicies(dictionary, arr);

export const isGranted = (state) => (lvl) => check(lvl, myRestriction(state));

export { arrayFilter };

export const MENU_QUIZ = policy(RIGHTS.LEXICON_IS_EXIST);
