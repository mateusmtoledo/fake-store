import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

const rootContainer = document.getElementById("root");
if (!rootContainer) throw new Error("Root element not found");

const root = ReactDOM.createRoot(rootContainer);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
