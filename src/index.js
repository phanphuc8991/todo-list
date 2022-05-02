import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import GlobalStyle from "./components/GlobalStyle";
import AuthProvider from "./AuthProvider";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Login from "./components/Login";

ReactDOM.render(
  <BrowserRouter>
    <GlobalStyle>
      <AuthProvider>
        <Routes>
          <Route element={<Login />} path="/login" />
          <Route exact element={<App />} path="/todo" />
        </Routes>
      </AuthProvider>
    </GlobalStyle>
  </BrowserRouter>,
  document.getElementById("root")
);
