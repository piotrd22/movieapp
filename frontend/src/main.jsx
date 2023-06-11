import React from "react";
import ReactDOM from "react-dom/client";
import { ReactKeycloakProvider } from "@react-keycloak/web";
import keycloak from "./Keycloak.js";
import App from "./App.jsx";
import "./index.css";

const initOptions = { pkceMethod: "S256", checkLoginIframe: false };

ReactDOM.createRoot(document.getElementById("root")).render(
  <ReactKeycloakProvider authClient={keycloak} initOptions={initOptions}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </ReactKeycloakProvider>
);
