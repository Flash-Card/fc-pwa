import I from 'immutable';
import {
  srcArrToMapSerialize,
  dstObjToObjSerialize,
  dstObjToImSerialize,
  createSerializer,
  dstImToObjSerialize,
  isExistValue,
} from 'lib/serialize';

export const typeSerialize = srcArrToMapSerialize({
  id: (v, data, i) => [data[i][v], I.fromJS(data[i])],
});

export const lexiconSerialize = srcArrToMapSerialize({
  key: (v, data, i) => [data[i][v], lexiconItemImSerialize(data[i])],
}, l => l.map(() => 'key'));

export const setsSerialize = srcArrToMapSerialize({
  id: (v, data, i) => [data[i][v], setsItemImSerialize(data[i])],
});

function cardValues(v = []) {
  const item = e => ({ value: (e.value || '').trim(), type: e.type })
  return v.map(item);
}

const cardItem = {
  index: v => ['index', v],
  key: v => ['key', (v || '').trim()],
  values: v => ['values', cardValues(v)],
  meta: () => ['meta', { element: 'word' }],
};

const typeItem = {
  id: (_, data) => ['id', data.title],
  title: v => ['title', v],
};

const lexiconItem = {
  ...createSerializer([
    'key',
    'count',
    'k',
    'lastShow',
    'dateAdd',
  ]),
};

const setsItem = {
  ...createSerializer([
    'id',
    'title',
    'isLoaded',
  ]),
  meta: v => ['meta', I.fromJS(v)],
};

export const lexiconItemImSerialize = dstObjToImSerialize(lexiconItem);

const setsItemImSerialize = dstObjToImSerialize(setsItem);

function cardImValues(v = []) {
  const item = e => new I.Map({ value: (e.value || '').trim(), type: e.type });
  return new I.List(v.map(item));
}

export const cardItemImSerialize = dstObjToImSerialize({
  ...cardItem,
  values: v => ['values', cardImValues(v)],
  meta: () => ['meta', new I.Map({ element: 'word' })],
});

export const cardItemDeSerialize = dstObjToObjSerialize(cardItem);

export const typeItemSerialize = dstObjToObjSerialize(typeItem);

export const cadsToLexiconSerialize = dstImToObjSerialize({
  key: v => ['key', v],
  dateAdd: v => ['dateAdd', isExistValue(v, new Date())],
  count: v => ['count', isExistValue(v, 0)],
  k: v => ['k', isExistValue(v, 1)],
  lastShow: v => ['k', isExistValue(v, undefined)],
});
