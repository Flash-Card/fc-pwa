import { put, select, takeEvery, call } from 'redux-saga/effects';
import * as Cards from 'domain/cards/sagas';
import * as Log from 'domain/log/sagas';

function* truePositive({ payload }) {
  yield call(Log.ensureAddItem, { payload, status: 'positive' });
}

function* trueNegative({ payload }) {
  yield call(Log.ensureAddItem, { payload, status: 'negative' });
}

function* createQuiz() {
  const list = yield select(Cards.selector.lexiconKeys);
  yield put(Cards.action.fillQuiz(list));
}

export default function* () {
  yield call(createQuiz);
  yield takeEvery(Cards.action.positive.type, truePositive);
  yield takeEvery(Cards.action.negative.type, trueNegative);
  yield takeEvery(Cards.action.newQuiz.type, createQuiz);
}
