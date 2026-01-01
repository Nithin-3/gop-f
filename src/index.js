import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { SocketContext, socket } from "./context/socketContext";
import App from "./App";
import Store from "./store";

import "./index.css";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <StrictMode>
    <Provider store={Store}>
      <SocketContext.Provider value={socket}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </SocketContext.Provider>
    </Provider>
  </StrictMode>
);
