import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { AutContextProvider } from "./Context/AuthContext.jsx";
import { SocketContextProvider } from "./Context/SocketContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AutContextProvider>
        <SocketContextProvider>
          <App />
        </SocketContextProvider>
      </AutContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
