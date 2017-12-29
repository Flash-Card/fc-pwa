import { put, select} from 'redux-saga/effects';
import * as Cards from 'domain/cards/sagas';

export default function* () {
  const list = yield select(Cards.selector.lexiconKeys);
  yield put(Cards.action.fillQuiz(list));
}
