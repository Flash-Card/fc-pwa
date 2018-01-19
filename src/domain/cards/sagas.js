import { call, put, select, fork } from 'redux-saga/effects';
import I from 'immutable';
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

export function* getCardNeighbor({ set, index }) {
  const all = yield call(
    idb.getNeighbor,
    set,
    index,
  );
  const prev = all[0] ? [all[0].set, all[0].key] : [];
  const next = all[1] ? [all[1].set, all[1].key] : [];
  return { prev, next };
}

export function* ensureGetCard({ key, set }) {
  const card = yield call(idb.getCard, set, key);
  const neighbor = yield call(getCardNeighbor, card);

  yield put({
    type: action.getDictItem.success,
    payload: cardItemImSerialize(card)
      .setIn(['meta', 'prev'], new I.List(neighbor.prev))
      .setIn(['meta', 'next'], new I.List(neighbor.next)),
  });

  const currentSet = (yield select(selector.setsById))
    .get(set)
    .setIn(['meta', 'current'], new I.List([set, key]));

  yield fork(ensureUpdateSets, currentSet);

}

export function* ensureCreateCard({ payload }) {
  let index = 0;
  try {
    const sets = yield select(selector.setsById);
    if (!sets.has(payload.set)) {
      yield call(ensureAddSetItem, {
        id: payload.set,
        progress: 100,
        title: 'Your own dictionary',
        isOwn: true,
        meta: {
          first: [payload.set, payload.key],
          length: 1,
        },
      });
    } else {
      const set = sets.get(payload.set);
      index = set.getIn(['meta', 'length']);
      yield call(
        ensureUpdateSets,
        set.updateIn(['meta', 'length'], l => l + 1),
      );
    }

    yield call(
      idb.addItem,
      idb.TABLE.DICTIONARY,
      cardItemDeSerialize({ ...payload, index }),
    );

    yield put({
      type: action.createCard.success,
      ...payload,
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
