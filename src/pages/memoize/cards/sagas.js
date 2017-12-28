import { takeLatest, call, select } from 'redux-saga/effects';
import * as Cards from 'domain/cards/sagas';

// function* watchAddToLexicon() {
//   const card = yield select(Cards.selector.cardItem);
//   console.log(card);
// }

export default function* (_, { params }) {
  yield call(Cards.ensureGetCard, params);
  yield takeLatest(Cards.action.addToLexicon.type, Cards.ensureAddToLexicon);
  yield takeLatest(Cards.action.removeFromLexicon.type, Cards.ensureRemoveFromLexicon);
}
