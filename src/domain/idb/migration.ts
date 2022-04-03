import * as C from './constants';

export default function requestUpgrade(this: IDBOpenDBRequest, ev: IDBVersionChangeEvent): any {
  if (ev.oldVersion < 1) {
    const osDecks = this.result.createObjectStore(
      C.TABLE.decks.name, {
        keyPath: C.TABLE.decks.index.id,
        autoIncrement: false,
      }
    );
    osDecks.createIndex(
      C.TABLE.decks.index.id,
      C.TABLE.decks.index.id, {
        unique: true
      }
    )
    const osCards = this.result.createObjectStore(
      C.TABLE.cards.name, {
        keyPath: C.TABLE.decks.index.id,
        autoIncrement: false,
      }
    );
    osCards.createIndex(
      C.TABLE.cards.index.id,
      C.TABLE.cards.index.id, {
        unique: false,
      }
    );
    osCards.createIndex(
      C.TABLE.cards.index.deckId,
      C.TABLE.cards.index.deckId, {
        unique: false,
      }
    );
  }
};