import { combineReducers, createStore, compose, applyMiddleware } from 'redux';
import Immutable from 'immutable';
import thunk from 'redux-thunk';
import { routerMiddleware } from 'react-router-redux';
import installDevTools from 'immutable-devtools';
import createSagaMiddleware, { END } from 'redux-saga';
import { dstExObjToObjSerialize } from 'lib/serialize';
import {
  typeSerialize,
  lexiconSerialize,
  setsSerialize,
} from 'domain/cards/helpers';
import storeMiddleware from '../lib/storeMiddlware';

const __DEV__ = (process.env.NODE_ENV === 'production');

installDevTools(Immutable);

const stateSerialize = dstExObjToObjSerialize({
  types: v => ['types', typeSerialize(v)],
  lexicon: v => ['lexicon', lexiconSerialize(v)],
  sets: v => ['sets', setsSerialize(v)],
});

export default function configureStore(history, state) {

  let composeEnhancers = compose;
  const initialState = stateSerialize(state);
  const sagaMiddleware = createSagaMiddleware();

  if (!__DEV__) {
    const devEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
    if (typeof devEnhancers === 'function') {
      composeEnhancers = devEnhancers;
    }
  }

  const store = createStore(
    combineReducers({
      ...require('./cards').reducer,
      ...require('./ui/').reducer,
      ...require('./router').reducer,
      form: require('redux-form/lib/reducer').default,
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
};

