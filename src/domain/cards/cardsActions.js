import { action, asyncAction } from 'lib/action';

export const getDictionary = asyncAction('sets/GET_SET');

export const updateSet = asyncAction('sets/UPDATE_SET');

export const addSetItem = action('sets/ADD_ITEM', action => action);

export const addToLexicon = asyncAction('dict/ADD_TO_LEXICON');

export const removeFromLexicon = asyncAction('dict/REMOVE_FROM_LEXICON');

export const updateLexicon = asyncAction('dict/UPDATE_LEXICON');

export const getDictItem = asyncAction('dict/GET_ITEM');

export const search = asyncAction('dict/SEARCH');

export const searchWithSpellCheck = asyncAction('dict/SEARCH_WITH_SPELL_CHECK');

export const createCard = asyncAction('card/CREATE_CARD');

export const editCard = asyncAction('card/EDIT_CARD');

export const fillQuiz = action('quiz/FILL_LIST');

export const negative = action('quiz/NEGATIVE');

export const positive = action('quiz/POSITIVE');

export const nextCard = action('quiz/NEXT_CARD');

export const newQuiz = action('quiz/NEW_QUIZ');
