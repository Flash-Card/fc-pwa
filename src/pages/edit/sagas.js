import { call, put, takeEvery } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import * as Cards from 'domain/cards/sagas';
import { routesById } from 'domain/router/routes';

const OWN_DICT = 'owner-dict';

function* watchEditCard({ payload }) {
  if (payload.set === OWN_DICT) {
    yield call(Cards.ensureUpdateCard, { payload });
  } else {
    yield call(Cards.ensureCreateCard, {
      payload: {
        ...payload,
        set: OWN_DICT,
        index: undefined,
      },
    });
  }
}

function* changePath(params) {
  yield put(
    push(routesById['/memoize/:set/:key'].path.pathMaker(params)),
  );
}

export default function* (_, { params }) {
  yield takeEvery(Cards.action.editCard.type, watchEditCard);
  yield takeEvery(Cards.action.editCard.success, changePath, params);
  yield takeEvery(Cards.action.createCard.success, changePath);
  yield call(Cards.ensureGetCard, params);
};
