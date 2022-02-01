import { configureStore } from '@reduxjs/toolkit';
import channelsReducer from './channelsSlice.js';
import messagesReducer from './messagesSlice.js';
import usersReducer from './usersSlice.js';
import modalsReducer from './modalsSlice.js';

export default configureStore({
  reducer: {
    channels: channelsReducer,
    messages: messagesReducer,
    users: usersReducer,
    modals: modalsReducer,
  },
});
