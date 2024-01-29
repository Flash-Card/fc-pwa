import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { configureStore } from "./domain";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";

import App from "./pages";

const container = document.getElementById("root");
const root = createRoot(container!);

async function flashCardApp() {
  const store = await configureStore();
  try {
  } catch (err) {
  } finally {
    root.render(
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    );
  }
}

flashCardApp();
serviceWorkerRegistration.register();
