import { call, put } from 'redux-saga/effects';
import { replace } from 'react-router-redux';
import Api from 'domain/api';
import * as idb from 'lib/db';
import * as action from './envActions';
import * as selector from './envSelector';
import { envSerialize } from './helpers';
export { action, selector };

export function* version() {
  const db = yield call(idb.version);
  yield put(action.version(db));
}

export function* clearDB() {
  try {
    const payload = yield call(idb.clean);
    yield put({
      type: action.clearDB.success,
      payload,
    });
    window.location.reload();
  } catch (err) {
    yield put({
      type: action.clearDB.failure,
      err,
    });
  }
}

export function* ensureSignIn(params) {
  try {

    const { data: { access_token } } = yield call(Api.auth, { params });

    const envList = [
      {
        key: 'user', value: {
          access_token,
        },
      }, {
        key: 'isAuthorized',
        value: true,
      },
    ];

    yield put({
      type: action.signIn.success,
      payload: envSerialize(envList),
    });

    yield call(idb.addList, idb.TABLE.ENV, envList);

    yield put(
      replace({
        pathname: '/',
        search: '',
      }),
    );

  } catch (err) {
    yield put({
      type: action.signIn.success,
      err,
    });
  }
}
