import { takeLatest } from 'redux-saga/effects';
import * as Cards from 'domain/cards/sagas';

export default function* () {
  yield takeLatest(Cards.action.createCard.type, Cards.ensureCreateCard);
}
