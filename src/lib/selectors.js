/** @flow */

import * as I from 'immutable';
import { createSelectorCreator, defaultMemoize } from 'reselect';

export const peek = (...path: Array<string | number>) => (obj: I.Map<string, any>) => obj.getIn(path);

export const peekOr = (path: Array<string | number>, def: any) => (obj: I.Map<string, any>) => obj.getIn(path, def);

function sThen(selector) {
  return state => selector(this(state))(state);
}

function sMap(f) {
  return selector(this, f);
}

const Selector = createSelectorCreator(defaultMemoize, I.is);

export function selector(...args: Array<Function>) {
  const res = Selector(...args);
  res.then = sThen;
  res.map = sMap;
  return res;
}

export const select = (f: Function) => selector(x => x, f);
