import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import GlobalStyle from "./components/GlobalStyle";
import GlobalContext from "./components/GlobalContext";

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyle>
      <GlobalContext>
        <App />
      </GlobalContext>
    </GlobalStyle>
  </React.StrictMode>,
  document.getElementById("root")
);
