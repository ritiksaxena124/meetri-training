import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css"; 
const rootEle = document.getElementById("root");

if (rootEle) {
  createRoot(rootEle).render(<App />);
} else {
  console.log("Root element not found!");
}
