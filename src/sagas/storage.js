import { call, takeEvery } from 'redux-saga/effects';
import * as Cards from 'domain/cards/sagas';
import * as UI from 'domain/ui/sagas';
import * as idb from 'lib/db';

function* ensureInsertKit(dispatch, { set, payload }) {

  const progress = l => dispatch(
    UI.action.progress({
      id: set.get('id'),
      payload: Math.ceil(l * 100),
    }),
  );

  const list = yield call(idb.addList, idb.TABLE.DICTIONARY, payload, { progress });

  const data = set
    .set('progress', 100)
    .setIn(['meta', 'first'], list[0])
    .setIn(['meta', 'last'], list[list.length - 1]);

  yield call(Cards.ensureUpdateSets, data);
}

export default function* (dispatch) {
  yield takeEvery(Cards.action.getDictionary.success, ensureInsertKit, dispatch);
}
