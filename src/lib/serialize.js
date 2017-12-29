import I from 'immutable';

function accessor(serializer, getter, data, V, I = 0) {
  return serializer[V](getter(data, V, I), data, I);
}

/**
 * Function create serializer that make output object from input data key
 * @param serializer {object} object of function
 * @param iterator {function} that iterate input data (iterate on key list)
 * @param getter {function} that can get element from input object
 * @param setter {function} that can set in output data
 * @param def {any} default object
 * @returns {function(*=)} this function receive data that need to be serialized
 */

export function srcSerializer(serializer, iterator, getter, setter, def = {}) {
  const cAccessor = (data, V, I) => accessor(serializer, getter, data, V, I);
  return (data) => {
    return iterator(data)
      .reduce((A, V, I) => {
        if (typeof serializer[V] === 'function') {
          return setter(A, cAccessor(data, V, I));
        }
        return A;
      }, def);
  };
}

/**
 * Function create serializer that make output object from serializer key
 * @param serializer {object} object of function
 * @param getter {function} that can get element from input object
 * @param setter {function} that can set in output data
 * @param def {any} default object
 * @returns {function(*=): *} this function receive data that need to be serialized
 */

function dstSerializer(serializer, getter, setter, def = {}) {
  const iterator = Object.keys(serializer);
  const cAccessor = (data, V) => accessor(serializer, getter, data, V);
  return (data) => iterator.reduce((A, V) => {
    const res = cAccessor(data, V);
    if (Array.isArray(res) && typeof res[1] !== 'undefined') {
      return setter(A, res);
    }
    return A;
  }, def);
}

function dstExistSerializer(serializer, getter, setter, exist, def = {}) {
  const iterator = Object.keys(serializer);
  const cAccessor = (data, V) => accessor(serializer, getter, data, V);
  return (data) => iterator.reduce((A, V) => {
    const ccAccessor = (V) => cAccessor(data, V);
    if (exist(data, V)) {
      return setter(A, ccAccessor(V));
    }
    return A;
  }, def);
}

export function createSerializer(list) {
  const fn = V => ({ [V]: x => [V, x] });
  return list.reduce((A, V) => Object.assign({}, A, fn(V)), {});
}

export function objHas(obj, key) {
  return (key in obj);
}

export function imHas(map, key) {
  return map.has(key);
}

export function objSetter(obj, tapl) {
  return Object.assign({}, obj, { [tapl[0]]: tapl[1] });
}

export function imSetter(map, tapl) {
  return map.set(tapl[0], tapl[1]);
}

export function objGetter(obj, key) {
  return (obj && key in obj) ? obj[key] : undefined;
}

export function imGetter(map, key) {
  return map.get(key);
}

export function objIterator(obj) {
  return Object.keys(obj);
}

export function imIterator(map) {
  return map.keySeq().toList();
}

export const emptyMap = new I.Map();
export const emptyList = new I.List();

export function listToMap(list, keyName = 'id') {
  return list.reduce((A, V) => A.set(V.get(keyName), V), emptyMap);
}

export function isExistValue(v, def) {
  return typeof v === 'undefined' ? def : v;
}

export const dstImToObjSerialize = (serializer) => dstSerializer(serializer, imGetter, objSetter);
export const dstExImToObjSerialize = (serializer) => dstExistSerializer(serializer, imGetter, objSetter, imHas);
export const dstExObjToObjSerialize = (serializer) => dstExistSerializer(serializer, objGetter, objSetter, objHas);
export const dstObjToObjSerialize = (serializer) => dstSerializer(serializer, objGetter, objSetter);
export const dstObjToImSerialize = (serializer) => dstSerializer(serializer, objGetter, imSetter, emptyMap);
export const srcArrToMapSerialize = (serializer, iterator = l => l.map(() => 'id')) => srcSerializer(serializer, iterator, (_, key) => key, imSetter, emptyMap);
