import { IDB, EMode, promisifyRequest } from 'lib/idb';
import { arrayToRecord } from 'lib/dataAdapters';
import * as C from './constants';
import requestUpgrade from './migration';
import { IDeckItem, ICard } from '../decks';

export default class CDB extends IDB {
  constructor() {
    super(C.DB_NAME, requestUpgrade, 1);
  }

  getDeck = async (id: string): Promise<IDeckItem> => {
    const idb = await this.open();
    const transaction = idb.transaction([C.TABLE.decks.name, C.TABLE.cards.name], EMode.READONLY);
    transaction.oncomplete = () => { idb.close(); };
    const osDecks = transaction.objectStore(C.TABLE.decks.name);
    const osCards = transaction.objectStore(C.TABLE.cards.name).index(C.TABLE.cards.index.deckId);
    const deck = await promisifyRequest<IDeckItem>(osDecks.get(id));
    const cards = await promisifyRequest<ICard[]>(osCards.getAll(id));
    return ({ ...deck, cards: arrayToRecord(cards, 'id') });
  }

  deleteDeck = async (id: string): Promise<void> => {
    const idb = await this.open();
    const transaction = idb.transaction([C.TABLE.decks.name, C.TABLE.cards.name], EMode.READWRITE);
    transaction.oncomplete = () => { idb.close(); };
    const osDecks = transaction.objectStore(C.TABLE.decks.name);
    const osCards = transaction.objectStore(C.TABLE.cards.name);
    await promisifyRequest(osDecks.delete(id));
    return new Promise((resolve, reject) => {
      const req = osCards.index(C.TABLE.cards.index.deckId).openKeyCursor(IDBKeyRange.only(id));
      req.onerror = (err) => reject(err);
      req.onsuccess = function() {
        const cursor = req.result;
        if (cursor) {
          osCards.delete(cursor.primaryKey);
          cursor.continue();
        } else {
          resolve();
        }
      }
    });
  }
}
