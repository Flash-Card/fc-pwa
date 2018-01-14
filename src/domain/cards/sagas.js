import { call, put, select } from 'redux-saga/effects';
import I from 'immutable';
import Api, { ensure } from 'domain/api';
import * as selector from './cardsSelector';
import * as action from './cardsActions';
import * as idb from 'lib/db';
import {
  cardItemImSerialize,
  cadsToLexiconSerialize,
  lexiconItemImSerialize, cardItemDeSerialize,
} from './helpers';

export { action, selector } ;

export const ensureGetDictionary = ensure({
  api: Api.ajaxGet,
  action: action.getDictionary,
  serializer: (data, set) => ({
    payload: data.match(/[^\r\n]+/g).map(e => ({ key: e })),
    set,
  }),
}, 'set');

export function* getCardBy(index, value) {
  return yield call(
    idb.getItem,
    idb.TABLE.DICTIONARY,
    index,
    value,
  );
}

export function* ensureGetCard({ cardId }) {
  const value = parseInt(cardId, 10);
  if (!isNaN(value)) {
    const card = yield call(getCardBy, 'index', value);
    if (typeof card !== 'undefined') {
      const set = (yield checkCardSets(card.index)).setIn(['meta', 'current'], card.index);
      yield call(ensureUpdateSets, set);
      yield put({
        type: action.getDictItem.success,
        payload: cardItemImSerialize(card).set('set', set),
      });
    }
  }
}


export function* checkCardSets(index) {

  const sets = yield select(selector.setsList);

  const check = function(e) {
    return e.getIn(['meta', 'first']) <= index && index <= e.getIn(['meta', 'last']);
  };

  return sets
    .filter(e => (e.get('progress') === 100))
    .reduce((A, V) => {
      if (A.size) return A;
      return check(V) ? V : A;
    }, new I.Map());

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
