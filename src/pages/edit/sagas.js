import { call, put, select, takeEvery, take } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import * as Cards from 'domain/cards/sagas';
import { routesById } from 'domain/router/routes';
import actions from 'redux-form/lib/actions';

export default function* (_, { params }) {
  yield takeEvery(Cards.action.editCard.type, Cards.ensureUpdateCard);
  yield call(Cards.ensureGetCard, params);
  const card = yield select(Cards.selector.cardItem);
  yield put(actions.initialize('edit', card.set('to_set', true).toJS()));
  yield take(Cards.action.editCard.success);
  yield put(
    push(routesById['/memoize/:cardId'].path.pathMaker(params)),
  );
};
