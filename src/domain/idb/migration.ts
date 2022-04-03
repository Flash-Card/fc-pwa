import * as C from './constants';

export default function requestUpgrade(this: IDBOpenDBRequest, ev: IDBVersionChangeEvent): any {
  // const fixtures = [];
  console.log(ev, '((((())))');
  if (ev.oldVersion < 1) {
    const osDecks = this.result.createObjectStore(
      C.TABLE.decks.name, {
        keyPath: C.TABLE.decks.index.id,
        autoIncrement: false,
      }
    );
    const osCards = this.result.createObjectStore(
      C.TABLE.cards.name, {
        keyPath: C.TABLE.decks.index.id,
        autoIncrement: false,
      }
    );
    osCards.createIndex(
      C.TABLE.cards.index.deckId,
      C.TABLE.cards.index.deckId, {
        unique: false,
      }
    );
  }
  // return fixtures;
};