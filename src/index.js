import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import GlobalStyle from "./components/GlobalStyle";
import GlobalContext from "./components/GlobalContext";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Login from "./components/Login";

ReactDOM.render(
  <BrowserRouter>
    <GlobalStyle>
      <GlobalContext>
        <Routes>
          <Route element={<Login />} path="/login" />
          <Route exact element={<App />} path="/" />
        </Routes>
      </GlobalContext>
    </GlobalStyle>
  </BrowserRouter>,
  document.getElementById("root")
);
