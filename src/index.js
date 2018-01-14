import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import createHistory from 'history/createHashHistory';
import { ConnectedRouter } from 'react-router-redux';
import configureStore from './domain';
import registerServiceWorker from './registerServiceWorker';
import { fillStore } from 'lib/db/index';
import rootSaga from './sagas';
import * as config from 'config';

import App from './pages';

fillStore(config)
  .then((state) => {

    const history = createHistory();

    const store = configureStore(history, state);

    store.runSaga(rootSaga, store.dispatch);

    ReactDOM.render(
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <App />
        </ConnectedRouter>
      </Provider>,
    document.getElementById('root'));
  });

registerServiceWorker();

