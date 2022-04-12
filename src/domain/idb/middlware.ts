import { Dispatch, MiddlewareAPI, Store } from 'redux';
import CDB from './db';
import * as C from './constants';
import { Action, AppState } from '../types';
import { EEventsTag, enrichException } from 'lib/logger';
import {
  EActionType,
  IDeckItem,
  getDeckListSuccess,
  getDeckSuccess,
} from '../decks';

type TMiddleware = MiddlewareAPI<Dispatch<Action>, Store<AppState, Action>>;

export default function idMiddleware() {
  const Idb = new CDB();
  return ({ dispatch }: TMiddleware) => (next: Dispatch<Action>) => (action: Action) => {
    switch (action.type) {
      case EActionType.ADD_DECK:
        Idb.addItem(C.TABLE.decks.name, action.payload);
        break;

      case EActionType.ADD_CARD:
        Idb.addItem(C.TABLE.cards.name, action.payload);
        break;

      case EActionType.UPDATE_CARD:
        Idb.updateItem(C.TABLE.cards.name, action.payload);
        break;

      case EActionType.GET_DECK_LIST_REQUEST:
        Idb.getAll<ReadonlyArray<IDeckItem>>(C.TABLE.decks.name)
          .then(decks => {
            if (decks) dispatch(getDeckListSuccess(decks));
          })
          .catch((err) => {
            enrichException(err, action, EEventsTag.IDB);
          });
        break;
        
      case EActionType.GET_DECK_REQUEST:
        Idb.getDeck(action.payload)
          .then(deck => {
            if (deck) dispatch(getDeckSuccess(deck));
          })
          .catch((err) => {
            enrichException(err, action.payload, EEventsTag.IDB);
          });
        break;

      case EActionType.DELETE_CARD:
        Idb.deleteItem(C.TABLE.cards.name, action.payload.id);
        break;

      case EActionType.DELETE_DECK:
        Idb.deleteDeck(action.payload);
        break;
    }
    return next(action);
  }
}

