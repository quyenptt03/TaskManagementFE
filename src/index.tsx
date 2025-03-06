import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import "./common/styles/index.css";
import { BrowserRouter } from "react-router";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
