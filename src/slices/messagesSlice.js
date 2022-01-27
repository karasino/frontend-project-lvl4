import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  entities: {},
  ids: [],
};

export const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessage: (state, action) => {
      const { message } = action.payload;
      state.entities[message.id] = message;
      state.ids.push(message.id);
    },
    addMessages: (state, action) => {
      const messages = action.payload;
      const entities = {};
      for (const message of messages) {
        entities[message.id] = message;
      }
      const ids = messages.map((message) => message.id);
      state.entities = entities;
      state.ids = ids;
    },
    removeMessage: (state, action) => {
      const { messageId } = action.payload;
      delete state.entities[messageId];
      state.ids = state.ids.filter((id) => id !== messageId);
    },
    updateMessage: (state, action) => {
      const { messageId, data } = action.payload;
      Object.assign(state.entities[messageId], data);
    },
  },
});

export const { addMessage, addMessages, removeMessage, updateMessage } = messagesSlice.actions;

export default messagesSlice.reducer;
