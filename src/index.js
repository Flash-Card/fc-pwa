import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import createHistory from 'history/createHashHistory';
import { ConnectedRouter } from 'react-router-redux';
import configureStore from './domain';
import registerServiceWorker from './registerServiceWorker';
import { fillStore } from 'lib/storeMiddlware';
import rootSaga from './sagas';

import App from './pages';

fillStore((state) => {

  const history = createHistory();

  const store = configureStore(history, state);

  store.runSaga(rootSaga);

  ReactDOM.render(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <App />
      </ConnectedRouter>
    </Provider>,
  document.getElementById('root'));

  registerServiceWorker();

});

