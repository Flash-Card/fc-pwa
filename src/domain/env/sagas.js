import { call, put } from 'redux-saga/effects';
import * as idb from 'lib/db';
import * as action from './envActions';
import * as selector from './envSelector';
export { action, selector };

export function* version() {
  const db = yield call(idb.version);
  yield put(action.version(db));
}

export function* clearDB() {
  console.log('!!!!');
  try {
    const payload = yield call(idb.clean);
    yield put({
      type: action.clearDB.success,
      payload,
    })
  } catch (err) {
    yield put({
      type: action.clearDB.failure,
      err,
    });
  }
}
