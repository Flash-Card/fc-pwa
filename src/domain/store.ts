import {
  Store,
  Reducer,
  combineReducers,
  createStore,
  compose,
  applyMiddleware
} from 'redux';
import thunk from 'redux-thunk';
import { AppState, Action } from './types';
import idMiddleware from 'domain/idb/middlware';

const __DEV__ = (process.env.NODE_ENV === 'development');

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

export default async function configureStore(): Promise<Store<AppState>> {

  let composeEnhancers = compose;
  const initialState = {} as AppState;

  if (__DEV__) {
    const devEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
    if (typeof devEnhancers === 'function') {
      composeEnhancers = devEnhancers;
    }
  }

  const reducers: Reducer<AppState> = combineReducers<AppState>({
    ...require('./env').reducer,
    ...require('./decks').reducer,
  });

  const store = createStore(
    reducers,
    initialState,
    composeEnhancers(
      applyMiddleware(
        thunk,
        idMiddleware(),
      ),
    ),
  );

  return store;
}
