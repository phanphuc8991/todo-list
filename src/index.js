import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import GlobalStyle from "./components/GlobalStyle";

ReactDOM.render(
  <GlobalStyle>
    <App />
  </GlobalStyle>,

  document.getElementById("root")
);
