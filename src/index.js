import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import GlobalStyle from './components/GlobalStyle'

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyle>
    <App />
    </GlobalStyle>
  </React.StrictMode>,
  document.getElementById('root')
);


