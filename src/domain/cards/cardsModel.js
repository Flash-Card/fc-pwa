import I from 'immutable';
import * as A from './cardsActions.js';
import { cardItemImSerialize } from './helpers';

const emptyMap = new I.Map();

const Sets = emptyMap;
const Cards = emptyMap;
const Types = emptyMap;
const CardsLog = emptyMap;
const Lexicon = emptyMap;

export const reducer = {
  sets(state = Sets, action) {
    switch (action.type) {

      case A.getDictionary.type:
        return state
          .setIn([action.payload.get('id'), 'isLoading'], true);

      case A.updateSet.success:
        return state
          .set(action.id, action.payload);

      default:
        return state;
    }
  },
  types(state = Types, action) {
    switch (action.type) {

      default:
        return state;
    }
  },
  lexicon(state = Lexicon, action) {
    switch (action.type) {

      case A.addToLexicon.success:
        return state
          .set(action.key, action.payload);

      case A.removeFromLexicon.success:
        return state
          .remove(action.key);

      default:
        return state;
    }
  },
  cards(state = Cards, action) {
    switch (action.type) {

      case A.createCard.type:
        return state;

      case A.getDictItem.success:
        return action.payload;

      default:
        return state;
    }
  },
  log(state = CardsLog, action) {
    switch (action.type) {

      default:
        return state;
    }
  },
};
