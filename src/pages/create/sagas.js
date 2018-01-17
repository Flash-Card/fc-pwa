import { takeLatest, takeEvery, put } from 'redux-saga/effects';
import * as Cards from 'domain/cards/sagas';
import actions from 'redux-form/lib/actions';

function* onSuccess() {
  yield put(actions.reset('create'));
}

export default function* () {
  yield takeLatest(Cards.action.createCard.type, Cards.ensureCreateCard);
  yield takeEvery(Cards.action.createCard.success, onSuccess);
}
