// @flow
import { Map, List, fromJS, Record, type RecordFactory, type RecordOf } from 'immutable';
import * as sz from 'serialize';
import { create as createSerializer } from 'serialize/lib/core';
import type {
  RawDictSet,
  RawSetMetaType,
  DictSetsStore,
  SetMetaType,
  DictSet,
} from './type.js.flow';

const emptyMap = new Map();
const emptyList = new List();
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
  const item = e => new Map({ value: (e.value || '').trim(), type: e.type });
  return new List(v.map(item));
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

const lexiconItem = {
  ...createSerializer([
    'key',
  ]),
  values: v => ['values', cardImValues(v)],
  meta: v => ['meta', fromJS(v)],
};

export const lexiconItemImSerialize = sz.dstObjToImSerialize(lexiconItem, emptyMap);

export const lexiconSerialize = sz.srcArrToMapSerialize({
  key: (v, data, i) => [data[i][v], lexiconItemImSerialize(data[i])],
}, emptyMap, l => l.map(() => 'key'));

/** ========
 * Sets */

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
  meta: v => ['meta', fromJS(v)],
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

function createSetMeta(): RawSetMetaType {
  return {
    description: '',
    type: 'jsonFC',
    url: '',
    length: 0,
  };
}

function createSet(): RawDictSet {
  return {
    id: '',
    title: '',
    isOwn: false,
    progress: 0,
    meta: createSetMeta(),
  };
}

const SetMetaFactory: RecordFactory<RawSetMetaType> = new Record(createSetMeta());

const DictSetFactory: RecordFactory<DictSet> = new Record(createSet());

export function setsFactory(set: RawDictSet[]): DictSetsStore {
  return set.reduce((a, v) => {
    const meta: SetMetaType = Object.assign(createSetMeta(), v.meta, {
      first: new List(v.meta.first || []),
      current: new List(v.meta.current || []),
    });
    const metaRecord: RecordOf<SetMetaType> = SetMetaFactory(meta);
    const setItem: DictSet = Object.assign(createSet(), v, { meta: metaRecord });
    const setRecord: RecordOf<DictSet> = DictSetFactory(setItem);
    return a.set(v.id, setRecord);
  }, new Map());
}

/** ======
 *  Type */

export const typeSerialize = sz.srcArrToMapSerialize({
  id: (v, data, i) => [data[i][v], fromJS(data[i])],
}, emptyMap);

const typeItem = {
  id: (_, data) => ['id', data.title],
  title: v => ['title', v],
};

export const typeItemSerialize = sz.dstObjToObjSerialize(typeItem);
