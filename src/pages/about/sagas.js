import { fork, takeLatest } from 'redux-saga/effects';
import * as Env from 'domain/env/sagas';

export default function* () {
  yield fork(Env.version);
  yield takeLatest(Env.action.clearDB.type, Env.clearDB);
}
