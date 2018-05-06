import I from 'immutable';
import * as sz from 'serialize';
import { create as createSerializer } from 'serialize/lib/core';

const emptyMap = new I.Map();
const emptyList = new I.List();
/**
 * Dictionary Card
 */

function cardValues(v = []) {
  const item = e => ({ value: (e.value || '').trim(), type: e.type });
  return v.map(item);
}

const cardItem = {
  index: v => ['index', v],
  set: v => ['set', v],
  key: v => ['key', (v || '').trim()],
  values: v => ['values', cardValues(v)],
};

function cardImValues(v = []) {
  const item = e => new I.Map({ value: (e.value || '').trim(), type: e.type });
  return new I.List(v.map(item));
}

export const cardItemImSerialize = sz.dstObjToImSerialize({
  ...cardItem,
  values: v => ['values', cardImValues(v)],
}, emptyMap);

export const cardItemDeSerialize = sz.dstObjToObjSerialize(cardItem);

export const cadsToLexiconSerialize = sz.dstImToObjSerialize({
  key: v => ['key', v],
  values: v => ['values', (v || emptyList).toJS()],
});

/** ========
 * Lexicon */

export const lexiconSerialize = sz.srcArrToMapSerialize({
  key: (v, data, i) => [data[i][v], lexiconItemImSerialize(data[i])],
}, emptyMap, l => l.map(() => 'key'));

const lexiconItem = {
  ...createSerializer([
    'key',
  ]),
  values: v => ['values', cardImValues(v)],
  meta: v => ['meta', I.fromJS(v)],
};

export const lexiconItemImSerialize = sz.dstObjToImSerialize(lexiconItem, emptyMap);

/** ========
 * Sets */

export const setsSerialize = sz.srcArrToMapSerialize({
  id: (v, data, i) => [data[i][v], setsItemImSerialize(data[i])],
}, emptyMap);

const setsItem = {
  ...createSerializer([
    'id',
    'title',
    'isOwn',
    'progress',
  ]),
};

export const setsItemImSerialize = sz.dstObjToImSerialize({
  ...setsItem,
  meta: v => ['meta', I.fromJS(v)],
}, emptyMap);

export const setsItemSerialize = sz.dstObjToObjSerialize({
  ...setsItem,
  meta: v => ['meta', v],
});

export const setsGlobal = (data, set) => {
  const setId = set.get('id');
  const cases = {
    jsonFC: () => ({
      payload: data.dictionary.map((e, index) => Object.assign({}, e, {
        set: setId,
        keyName: e.key.toUpperCase(),
        index,
      })),
      set,
    }),
    textLine: () => ({
      payload: data.match(/[^\r\n]+/g).map((e, index) => ({
        key: e,
        set: setId,
        keyName: e.toUpperCase(),
        index,
      })),
      set,
    }),
  };
  return cases[set.getIn(['meta', 'type'], 'textLine')]();
};

/** ======
 *  Type */

export const typeSerialize = sz.srcArrToMapSerialize({
  id: (v, data, i) => [data[i][v], I.fromJS(data[i])],
}, emptyMap);

const typeItem = {
  id: (_, data) => ['id', data.title],
  title: v => ['title', v],
};

export const typeItemSerialize = sz.dstObjToObjSerialize(typeItem);
