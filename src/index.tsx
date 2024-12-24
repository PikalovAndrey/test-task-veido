import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "bulma/css/bulma.css";
import App from "./App.tsx";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <div className="light-theme">
    <App />
  </div>
);
