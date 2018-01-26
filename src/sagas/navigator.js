import { fork, takeEvery, cancel, call, select } from 'redux-saga/effects';
import routes from 'domain/router/routes';
import { locationIsChange } from 'domain/router/RouterSelector';
import { LOCATION_CHANGE } from 'react-router-redux';
import { matchPath } from 'react-router-dom';


function routeMatcher() {

  let task;

  return function* ({ payload }) {
    if ( yield select(locationIsChange)) {
      if (task) yield cancel(task);
      for (let item of routes) {
        const match = matchPath(payload.pathname, {
          exact: ('exact' in item) ? item.exact : true,
          strict: false,
          path: item.path.pathname,
        });
        if (match !== null) {
          const track = {
            page: window.location.pathname + window.location.search + window.location.hash,
            title: item.title,
          };
          window.ga('set', track);
          window.ga('send', 'pageview');
          if ('saga' in item && typeof item.saga === 'function') {
            const sagas = yield call(item.saga);
            task = yield fork(sagas.default, payload, match);
          }
          break;
        }
      }
    }
  };
}

const matcher = routeMatcher();

export default function* navigator() {
  yield takeEvery(LOCATION_CHANGE, matcher);
}
