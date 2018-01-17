import { call, put, select, fork } from 'redux-saga/effects';
import Api, { ensure } from 'domain/api';
import * as selector from './cardsSelector';
import * as action from './cardsActions';
import * as idb from 'lib/db';
import {
  cardItemImSerialize,
  cadsToLexiconSerialize,
  lexiconItemImSerialize,
  cardItemDeSerialize,
  setsGlobal,
  setsItemSerialize,
  setsItemImSerialize,
} from './helpers';

export { action, selector } ;

export const ensureGetDictionary = ensure({
  api: Api.ajaxGet,
  action: action.getDictionary,
  serializer: setsGlobal,
}, 'set');

export function* getCardBy(index, value) {
  return yield call(
    idb.getItem,
    idb.TABLE.DICTIONARY,
    index,
    value,
  );
}

export function* getCardNeighbor(setName, index) {
  const all = yield call(
    idb.getListByIndex,
    idb.TABLE.DICTIONARY,
    'set',
    setName,
  );
  const currentIndex = all.map(e => e.index).indexOf(index);
  return {
    prev: all[currentIndex - 1],
    next: all[currentIndex + 1],
    length: all.length,
    currentIndex,
  };
}

export function* ensureGetCard({ cardId }) {
  const value = parseInt(cardId, 10);
  if (!isNaN(value)) {
    const card = yield call(getCardBy, 'index', value);
    if (typeof card !== 'undefined' && 'set' in card) {
      const set = (yield select(selector.setsById))
        .get(card.set)
        .setIn(['meta', 'current'], card.index);

      yield fork(ensureUpdateSets, set);
      const imCard = cardItemImSerialize(card).set('set', set);
      yield put({
        type: action.getDictItem.success,
        payload: imCard,
      });
      const neighbor = yield call(getCardNeighbor, card.set, card.index);
      yield put({
        type: action.getDictItem.success,
        payload: imCard.set('set', set
          .setIn(['meta', 'prev'], cardItemImSerialize(neighbor.prev))
          .setIn(['meta', 'next'], cardItemImSerialize(neighbor.next))
          .setIn(['meta', 'currentIndex'], neighbor.currentIndex)
          .setIn(['meta', 'length'], neighbor.length),
        ),
      });
    }
  }
}

export function* ensureCreateCard({ payload }) {
  try {
    const index = yield call(idb.addItem, idb.TABLE.DICTIONARY, cardItemDeSerialize(payload));
    const sets = yield select(selector.setsById);
    if (!sets.has(payload.set)) {
      yield call(ensureAddSetItem, {
        id: payload.set,
        progress: 100,
        title: 'Your own dictionary',
        isOwn: true,
        meta: {
          first: index,
        },
      });
    }
    yield put({
      type: action.createCard.success,
      index,
    });
  } catch (err) {
    yield put({
      type: action.createCard.failure,
      err,
    });
  }
}

export function* ensureUpdateCard({ payload }) {
  yield call(idb.updateItem, idb.TABLE.DICTIONARY, cardItemDeSerialize(payload));
  const lexicon = yield select(selector.lexiconKeys);
  const isInclude = lexicon.includes(payload.key);
  if (payload.to_set && !isInclude) {
    yield call(ensureAddToLexicon, { card: cardItemImSerialize(payload) });
  }
  yield put({
    type: action.editCard.success,
    payload,
  });
}

export function* ensureAddToLexicon({ card }) {
  const lexicon = cadsToLexiconSerialize(card || (yield select(selector.cardItem)));
  const key = yield call(idb.addItem, idb.TABLE.LEXICON, lexicon);
  yield put({
    type: action.addToLexicon.success,
    key,
    payload: lexiconItemImSerialize(lexicon),
  });
}

export function* ensureRemoveFromLexicon({ payload }) {
  const key = payload.get('key');
  yield call(idb.deleteItem, idb.TABLE.LEXICON, key);
  yield put({
    type: action.removeFromLexicon.success,
    key,
  });
}

export function* ensureAddSetItem(set) {
  try {
    yield call(idb.addItem, idb.TABLE.SETS, setsItemSerialize(set));
    yield put(
      action.addSetItem({
        payload: setsItemImSerialize(set),
        id: set.id,
      }),
    );
  } catch (err) {

  }
}

export function* ensureUpdateSets(data) {
  yield call(idb.updateItem, idb.TABLE.SETS, data.toJS());
  yield put({
    type: action.updateSet.success,
    id: data.get('id'),
    payload: data,
  });
}

export function* ensureUpdateLexicon(payload) {
  yield call(idb.updateItem, idb.TABLE.LEXICON, payload.toJS());
  yield put({
    type: action.updateLexicon.success,
    payload,
  });
}
