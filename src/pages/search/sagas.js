import { put, takeLatest } from 'redux-saga/effects';
import * as action from 'domain/cards/cardsActions';

export default function* () {
  yield takeLatest(action.searchWithSpellCheck.type, searchWithSpellCheck);
}

function* searchWithSpellCheck({ payload }) {
  yield put({
    type: action.searchWithSpellCheck.success,
    payload,
  });
}
