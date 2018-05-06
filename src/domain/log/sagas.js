import { call } from 'redux-saga/effects';
import { logItemSerialize } from './helpers';
import * as action from './logActions';
import * as selector from './logSelector';
import * as idb from 'lib/db';

export { action, selector };

export function* ensureAddItem(data) {
  try {
    yield call(idb.addItem, idb.TABLE.LOG, logItemSerialize(data));
  } catch (err) {
    console.warn(err);
  }
}
