import axios from 'axios';
import I from 'immutable';
import { call, put } from 'redux-saga/effects';

export function* callApi(api, arg = {}) {
  const headers = new I.Map();
  // const headers = yield select(tokenSelector);
  if (headers && headers.size) {
    return yield call(api, { ...arg, headers: headers.toJS() });
  }
  return yield call(api, arg);
}

export function ensure({ api, action, serializer = d => d, putGen = put }, name = 'payload') {
  return function* (args) {
    try {
      const { data } = yield callApi(api, args);
      yield putGen({
        type: action.success,
        ...serializer(data, args[name]),
      });
    } catch (err) {
      yield putGen({
        type: action.failure,
        err,
      });
    }
  };
}

function makeUrl(strings, ...values) {
  return (args) => {
    let str = '';
    for (let i=0; i < values.length; i++) {
      str += strings[i];
      str += args[values[i]];
    }
    str += strings[strings.length - 1];
    return str;
  };
}

function method(method, url) {
  return (args) => axios({
    method,
    url: typeof url === 'function' ? url(args) : url,
    ...args,
  });
}

export default {
  fixtures: method('get', makeUrl`${'pathname'}db/${'name'}`),
  ajaxGet: method('get', makeUrl`${'url'}`),
  auth: method('get', `${process.env.REACT_APP_CLOUD_API_HOST}/fc/auth`),
};
