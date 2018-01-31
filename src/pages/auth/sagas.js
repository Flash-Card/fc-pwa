import { call } from 'redux-saga/effects';
import qs from 'query-string';
import * as Env from 'domain/env/sagas';

export default function* () {
  const query = qs.parse(window.location.search);
  yield call(Env.ensureSignIn, query);
}
