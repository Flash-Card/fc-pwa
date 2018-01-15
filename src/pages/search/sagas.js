import { call, put, select, takeLatest, fork } from 'redux-saga/effects';
import * as idb from 'lib/db';
import * as action from 'domain/cards/cardsActions';
import { push } from 'react-router-redux';
import { routesById } from 'domain/router/routes';

export default function* () {
  yield takeLatest(action.getDictItemByKey.type, watchGetCardByKey);
  yield fork(searchWithSpellCheck);
}

function* watchGetCardByKey({ payload }) {
  const card = yield call(idb.getItem, idb.TABLE.DICTIONARY, 'key', payload.word);
  if (typeof card !== 'undefined') {
    yield put(
      push(routesById['/memoize/:cardId'].path.pathMaker({ cardId: card.index })),
    );
  }
}

function* searchWithSpellCheck() {
  const query = yield select((state) => state.routing.get('location').get('query'));
  const result = yield call(idb.searchWithSpellCheck, query.term);
  yield put({
    type: action.search.success,
    payload: result,
  });
}
