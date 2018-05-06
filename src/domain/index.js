import { combineReducers, createStore, compose, applyMiddleware } from 'redux';
import Immutable from 'immutable';
import thunk from 'redux-thunk';
import { routerMiddleware } from 'react-router-redux';
import installDevTools from 'immutable-devtools'; // eslint-disable-line import/no-extraneous-dependencies
import createSagaMiddleware, { END } from 'redux-saga';
import { dstExObjToObjSerialize } from 'serialize';
import {
  typeSerialize,
  lexiconSerialize,
  setsSerialize,
  setsFactory,
} from 'domain/cards/helpers';
import {
  envSerialize,
} from 'domain/env/helpers';

const __DEV__ = (process.env.NODE_ENV === 'development');

installDevTools(Immutable);

const stateSerialize = dstExObjToObjSerialize({
  types: v => ['types', typeSerialize(v)],
  lexicon: v => ['lexicon', lexiconSerialize(v)],
  sets: v => ['sets', setsFactory(v)],
  env: v => ['env', envSerialize(v)],
});

export default function configureStore(history, state) {

  let composeEnhancers = compose;
  const initialState = stateSerialize(state);
  const sagaMiddleware = createSagaMiddleware();

  if (__DEV__) {
    const devEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
    if (typeof devEnhancers === 'function') {
      composeEnhancers = devEnhancers;
    }
  }

  const store = createStore(
    combineReducers({
      ...require('./env').reducer,
      ...require('./cards').reducer,
      ...require('./ui/').reducer,
      ...require('./router').reducer,
      ...require('./log').reducer,
    }),
    initialState,
    composeEnhancers(
      applyMiddleware(
        thunk,
        sagaMiddleware,
        routerMiddleware(history),
      ),
    ),
  );

  store.runSaga = sagaMiddleware.run;
  store.close = () => store.dispatch(END);
  return store;
}

