import { fork, takeEvery, cancel, call } from 'redux-saga/effects';
import routes from 'domain/router/routes';
import { LOCATION_CHANGE } from 'react-router-redux';
import { matchPath } from 'react-router-dom';

let task;

function* routeMatcher({ payload }) {
  // if (yield select(locationIsChange)) {
    for (let item of routes) {
      const match = matchPath(payload.pathname, {
        exact: ('exact' in item) ? item.exact : true,
        strict: false,
        path: item.path.pathname,
      });
      if (task) yield cancel(task);
      if (match !== null) {
        if ('saga' in item && typeof item.saga === 'function') {
          const sagas = yield call(item.saga);
          task = yield fork(sagas.default, payload, match);
        }
        break;
      }
    }
  // }
}

export default function* navigator() {
  yield takeEvery(LOCATION_CHANGE, routeMatcher);
}
