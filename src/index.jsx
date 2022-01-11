// @ts-check

import 'core-js/stable/index.js';
import 'regenerator-runtime/runtime.js';
import React from 'react';
import ReactDOM from 'react-dom';

import '../assets/application.scss';
import App from './app.js';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

const container = document.querySelector('.container-lg');
container.classList.add('container');
ReactDOM.render(<App />, container);
