import { action, asyncAction } from 'lib/action';
import { cardItemDeSerialize } from './helpers';

export const getDictionary = asyncAction('dict/GET_SET');

export const updateSet = asyncAction('dict/UPDATE_SET');

export const addToLexicon = asyncAction('dict/ADD_TO_LEXICON');

export const removeFromLexicon = asyncAction('dict/REMOVE_FROM_LEXICON');

export const getDictItem = asyncAction('dict/GET_ITEM');

export const createCard = action('card/CREATE_CARD', data => ({
  payload: cardItemDeSerialize(data),
  meta: {
    table: 'dictionary',
    action: 'add',
  },
}));

export const editCard = asyncAction('card/EDIT_CARD');

export const getCrds = action('cards/GET_CARDS', data => ({
  payload: data,
  meta: {
    table: 'dictionary',
    action: 'get',
  },
}));

export const fillQuiz = action('quiz/FILL_LIST');
