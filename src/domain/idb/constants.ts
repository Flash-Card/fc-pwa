export const DB_NAME = 'flashcards';

export const TABLE = {
  decks: {
    name: 'decks',
    index: {
      id: 'id',
    }
  },
  cards: {
    name: 'cards',
    index: {
      id: 'id',
      deckId: 'deckId',
      front: 'front',
      back: 'back',
    }
  },
}
