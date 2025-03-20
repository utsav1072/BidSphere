import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom"; // ✅ Import BrowserRouter
import "./index.css";
import App from "./App";
import { store } from './app/store'
import { Provider } from 'react-redux'

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter> {/*  Wrap App inside BrowserRouter */}
        <App />
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
