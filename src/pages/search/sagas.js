import { call, put, takeLatest } from 'redux-saga/effects';
import * as idb from 'lib/db';
import * as action from 'domain/cards/cardsActions';
import { push } from 'react-router-redux';
import { routesById } from 'domain/router/routes';

export default function* () {
  yield takeLatest(action.getDictItemByKey.type, watchGetCardByKey);
  yield takeLatest(action.searchWithSpellCheck.type, searchWithSpellCheck);
}

function* watchGetCardByKey({ payload }) {
  const card = yield call(idb.getItem, idb.TABLE.DICTIONARY, 'key', payload.word);
  if (typeof card !== 'undefined') {
    yield put(
      push(routesById['/memoize/:cardId'].path.pathMaker({ cardId: card.index })),
    );
  }
}

function* searchWithSpellCheck({ payload }) {
  yield put({
    type: action.search.success,
    payload: payload,
  });
}
