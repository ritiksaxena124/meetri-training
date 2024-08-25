import ReactDOM from "react-dom/client";
import { App } from "./App";

const rootElement = document.getElementById("root");

if (rootElement) {
  ReactDOM.createRoot(rootElement).render(<App />);
} else console.log("Root element not found");
