import { takeLatest, call } from 'redux-saga/effects';
import * as Cards from 'domain/cards/sagas';

function* watchGetDictionary({ payload }) {
  yield call(Cards.ensureGetDictionary, {
    url: payload.getIn(['meta', 'url']),
    set: payload,
  });
}

export default function* memoizePage() {
  yield takeLatest(Cards.action.getDictionary.type, watchGetDictionary);
}
