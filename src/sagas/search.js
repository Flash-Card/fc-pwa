import { call, takeLatest, put } from 'redux-saga/effects';
import * as Cards from 'domain/cards/sagas';
import * as idb from 'lib/db';
import * as action from 'domain/cards/cardsActions';

function* watchSearch({ payload }) {
  if (payload.word.length === 0) {
    yield put({
      type: action.search.success,
      payload: [],
    });
  } else {
    const result = yield call(idb.searchByQuery, payload.word.toUpperCase());
    yield put({
      type: action.search.success,
      payload: result,
    });
  }
}

export default function* () {
  yield takeLatest(Cards.action.search.type, watchSearch);
}
