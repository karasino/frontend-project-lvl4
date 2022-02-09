import React from 'react';
import { useDispatch } from 'react-redux';
import App from './components/app.jsx';
import socketContext from './contexts/socket.jsx';
import { addChannel } from "./slices/channelsSlice.js";
import { addMessage } from "./slices/messagesSlice.js";

const Init = ({ socket }) => {
  const dispatch = useDispatch();
  socket.on('newMessage', (message) => {
    dispatch(addMessage({ message }));
  });
  socket.on('newChannel', (channel) => {
    dispatch(addChannel({ channel }));
  });

  const SocketProvider = ({ children }) => (
    <socketContext.Provider value={socket}>
      {children}
    </socketContext.Provider>
  );

  return (
    <SocketProvider>
      <App />
    </SocketProvider>
  );
};

export default Init;
