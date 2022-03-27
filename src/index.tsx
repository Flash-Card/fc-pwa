import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from "react-router-dom";
import { configureStore } from './domain';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';


import App from './pages';

async function flashCardApp() {
  const store = await configureStore();
  try {

  } catch (err) {

  } finally {
    ReactDOM.render(
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>,
      document.getElementById('root'));
  }
}

flashCardApp();
serviceWorkerRegistration.register();