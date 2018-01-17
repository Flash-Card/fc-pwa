import { call, put, select, takeEvery } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import * as Cards from 'domain/cards/sagas';
import { routesById } from 'domain/router/routes';
import actions from 'redux-form/lib/actions';

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

function* watchCreateSuccess({ index }) {
  yield call(changePath, { cardId: index });
}

function* changePath(params) {
  yield put(
    push(routesById['/memoize/:cardId'].path.pathMaker(params)),
  );
}

export default function* (_, { params }) {
  yield takeEvery(Cards.action.editCard.type, watchEditCard);
  yield takeEvery(Cards.action.editCard.success, changePath, params);
  yield takeEvery(Cards.action.createCard.success, watchCreateSuccess);
  yield call(Cards.ensureGetCard, params);
  const card = yield select(Cards.selector.cardItem);
  const item = card
    .set('to_lexicon', true)
    .updateIn(['set'], v => v.get('id')) //TODO: Update after change Card schema
    .toJS();
  yield put(
    actions.initialize('edit', item),
  );
};
