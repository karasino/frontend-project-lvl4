// @ts-check

import 'core-js/stable/index.js';
import 'regenerator-runtime/runtime.js';
import '../assets/application.scss';
import { io } from 'socket.io-client';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './slices/index.js';
import Init from './init.jsx';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}
const app = () => {
  const socket = io();
  const container = document.querySelector('.container-lg');
  container.classList.add('container');
  ReactDOM.render(
    <Provider store={store}>
      <Init socket={socket} />
    </Provider>,
    container
  );
};

app();
