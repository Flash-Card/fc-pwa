import set from 'lodash/fp/set';
import compose from 'lodash/fp/compose';
import update from 'lodash/fp/update';
import omit from 'lodash/fp/omit';
import { arrayToRecord } from 'lib/dataAdapters';

import { TDecks, Action, EActionType } from './types';

const initialDecks: TDecks = {
  // verbs01: {
  //   id: 'verbs01',
  //   name: 'Irregular Verbs',
  //   cards: {
  //     v001: {
  //       id: 'v001',
  //       deckId: 'verbs01',
  //       front: 'be',
  //       back: 'was were been',
  //     },
  //     v002: {
  //       id: 'v002',
  //       deckId: 'verbs01',
  //       front: 'go',
  //       back: 'went gone',
  //     },
  //     v003: {
  //       id: 'v003',
  //       deckId: 'verbs01',
  //       front: 'do',
  //       back: 'did done',
  //     },
  //     v004: {
  //       id: 'v004',
  //       deckId: 'verbs01',
  //       front: 'have',
  //       back: 'had had',
  //     },
  //   }
  // },
  // b1words: {
  //   id: 'b1words',
  //   name: 'B1 Words',
  //   description: 'Bords for B1 lavel',
  // },
  // oxford3000: {
  //   id: 'oxford3000',
  //   name: 'Oxford 3000 word'
  // }
}

export const reducer = {
  decks(state: TDecks = initialDecks, action: Action) {
    switch(action.type) {

      case EActionType.GET_DECK_REQUEST:
        return set(action.payload)({ id: action.payload })(state);

      case EActionType.GET_DECK_SUCCESS:
        return set(action.payload.id)(action.payload)(state);

      case EActionType.GET_DECK_LIST_SUCCESS:
        return {
          ...state,
          ...arrayToRecord(action.payload, 'id'),
        };

      case EActionType.ADD_DECK:
        return set(action.payload.id)(action.payload)(state);

      case EActionType.ADD_CARD:
      case EActionType.UPDATE_CARD:
        return update([action.payload.deckId, 'cards'])(
          set(action.payload.id)(action.payload)
        )(state);

      case EActionType.DELETE_DECK:
        return omit(action.payload)(state);

      case EActionType.DELETE_CARD:
        return update([action.payload.deckId, 'cards'])(
          omit(action.payload.id)
        )(state);

      default:
        return state;
    }
  }
}
