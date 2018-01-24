import I from 'immutable';
import {
  srcArrToMapSerialize,
  dstObjToObjSerialize,
  dstObjToImSerialize,
  createSerializer,
  dstImToObjSerialize,
  emptyList,
} from 'lib/serialize';

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

export const cardItemImSerialize = dstObjToImSerialize({
  ...cardItem,
  values: v => ['values', cardImValues(v)],
});

export const cardItemDeSerialize = dstObjToObjSerialize(cardItem);

export const cadsToLexiconSerialize = dstImToObjSerialize({
  key: v => ['key', v],
  values: v => ['values', (v || emptyList).toJS()],
});

/** ========
 * Lexicon */

export const lexiconSerialize = srcArrToMapSerialize({
  key: (v, data, i) => [data[i][v], lexiconItemImSerialize(data[i])],
}, l => l.map(() => 'key'));

const lexiconItem = {
  ...createSerializer([
    'key',
  ]),
  values: v => ['values', cardImValues(v)],
  meta: v => ['meta', I.fromJS(v)],
};

export const lexiconItemImSerialize = dstObjToImSerialize(lexiconItem);

/** ========
 * Sets */

export const setsSerialize = srcArrToMapSerialize({
  id: (v, data, i) => [data[i][v], setsItemImSerialize(data[i])],
});

const setsItem = {
  ...createSerializer([
    'id',
    'title',
    'isOwn',
    'progress',
  ]),
};

export const setsItemImSerialize = dstObjToImSerialize({
  ...setsItem,
  meta: v => ['meta', I.fromJS(v)],
});

export const setsItemSerialize = dstObjToObjSerialize({
  ...setsItem,
  meta: v => ['meta', v],
});

export const setsGlobal = (data, set) => {
  const setId = set.get('id');
  const cases = {
    'jsonFC': () => ({
      payload: data.dictionary.map((e, index) => Object.assign({}, e, {
        set: setId,
        keyName: e.key.toUpperCase(),
        index,
      })),
      set,
    }),
    'textLine': () => ({
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

export const typeSerialize = srcArrToMapSerialize({
  id: (v, data, i) => [data[i][v], I.fromJS(data[i])],
});

const typeItem = {
  id: (_, data) => ['id', data.title],
  title: v => ['title', v],
};

export const typeItemSerialize = dstObjToObjSerialize(typeItem);
