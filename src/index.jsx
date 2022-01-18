// @ts-check

import 'core-js/stable/index.js';
import 'regenerator-runtime/runtime.js';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import '../assets/application.scss';
import App from './components/app.jsx';
import store from './slices/index.js';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

const container = document.querySelector('.container-lg');
container.classList.add('container');
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  container
);
