import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
const rootEle = document.getElementById("root");
import { Provider } from "react-redux";
import store from "./store";

if (rootEle) {
  createRoot(rootEle).render(
    <Provider store={store}>
      <App />
    </Provider>
  );
} else {
  console.log("Root element not found!");
}
