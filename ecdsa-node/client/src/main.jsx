import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import AddressProvider from "../context/Address";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AddressProvider>
      <App />
    </AddressProvider>
  </React.StrictMode>,
);

