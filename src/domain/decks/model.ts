import set from 'lodash/fp/set';
import { TDecks, Action, EActionType } from './types';

const initialDecks: TDecks = {
  verbs01: {
    id: 'verbs01',
    name: 'Irregular Verbs',
    cards: {
      v001: {
        id: 'v001',
        front: 'be',
        back: 'was were been',
      },
      v002: {
        id: 'v002',
        front: 'go',
        back: 'went gone',
      },
      v003: {
        id: 'v003',
        front: 'do',
        back: 'did done',
      },
      v004: {
        id: 'v004',
        front: 'have',
        back: 'had had',
      },
    }
  },
  b1words: {
    id: 'b1words',
    name: 'B1 Words',
    description: 'Bords for B1 lavel',
  },
  oxford3000: {
    id: 'oxford3000',
    name: 'Oxford 3000 word'
  }
}

export const reducer = {
  decks(state: TDecks = initialDecks, action: Action) {
    switch(action.type) {

      case EActionType.ADD_DECK: {
        return set(action.payload.id)(action.payload)(state);
      }

      default:
        return state;
    }
  }
}
