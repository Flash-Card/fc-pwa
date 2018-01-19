import I from 'immutable';
import * as A from './cardsActions.js';
import * as UI from 'domain/ui/uiActions';
import * as Env from 'domain/env/envActions';

const emptyMap = new I.Map();

const Sets = emptyMap;
const Cards = emptyMap;
const Types = emptyMap;
const Lexicon = emptyMap;
const Quiz = I.fromJS({
  list: [],
  current: 0,
});
const SearchResults = new I.List();

export const reducer = {
  sets(state = Sets, action) {
    switch (action.type) {

      case Env.clearDB.success:
        return Sets;

      case A.addSetItem.type:
        return state
          .set(action.id, action.payload);

      case A.getDictionary.type:
        return state
          .setIn([action.payload.get('id'), 'progress'], 1);

      case A.updateSet.success:
        return state
          .mergeDeepIn([action.id], action.payload);

      case UI.progress.type:
        return state
          .setIn([action.id, 'progress'], action.payload);

      default:
        return state;
    }
  },
  types(state = Types, action) {
    switch (action.type) {

      case Env.clearDB.success:
        return Types;

      default:
        return state;
    }
  },
  lexicon(state = Lexicon, action) {
    switch (action.type) {

      case Env.clearDB.success:
        return Lexicon;

      case A.addToLexicon.success:
        return state
          .set(action.key, action.payload);

      case A.removeFromLexicon.success:
        return state
          .remove(action.key);

      case A.updateLexicon.success:
        return state
          .set(action.payload.get('key'), action.payload);

      default:
        return state;
    }
  },
  cards(state = Cards, action) {
    switch (action.type) {

      case Env.clearDB.success:
        return Cards;

      case A.createCard.type:
        return state;

      case A.getDictItem.success:
        return action.payload;

      default:
        return state;
    }
  },
  quiz(state = Quiz, action) {
    switch (action.type) {

      case Env.clearDB.success:
        return Quiz;

      case A.fillQuiz.type:
        return state
          .set('list', action.payload);

      case A.nextCard.type:
      case A.positive.type:
        return state
          .update('list', l => l.filter(f => f !== action.payload));

      default:
        return state;
    }
  },
  searchResults(state = SearchResults, action) {
    switch (action.type) {

      case A.search.success:
        return I.List(action.payload);

      default:
        return state;
    }
  },
};
