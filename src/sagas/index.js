import { fork, all } from 'redux-saga/effects';
import watchNavigate from './navigator';
import storage from './storage';

export default function* root() {
  yield all([
    fork(watchNavigate),
    fork(storage),
  ]);
}
