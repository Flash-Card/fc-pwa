import { call, takeEvery } from 'redux-saga/effects';
import * as Cards from 'domain/cards/sagas';
import * as idb from 'lib/db';

function* ensureInsertKit({ set, payload }) {
  const list = yield call(idb.addList, idb.TABLE.DICTIONARY, payload);

  const data = set
    .set('isLoaded', true)
    .setIn(['meta', 'first'], list[0])
    .setIn(['meta', 'last'], list[list.length - 1]);

  yield call(Cards.ensureUpdateSets, data);
}

export default function* () {
  yield takeEvery(Cards.action.getDictionary.success, ensureInsertKit);
}
