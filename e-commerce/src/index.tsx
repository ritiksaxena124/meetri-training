import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
const rootEle = document.getElementById("root");
import { Provider } from "react-redux";
import store from "./store";
import { persistor } from "./store";
import { PersistGate } from "redux-persist/integration/react";
if (rootEle) {
  createRoot(rootEle).render(
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  );
} else {
  console.log("Root element not found!");
}
