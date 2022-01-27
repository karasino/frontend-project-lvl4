import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  entities: {},
  ids: [],
};

export const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    addChannel: (state, action) => {
      const { channel } = action.payload;
      state.entities[channel.id] = channel;
      state.ids.push(channel.id);
    },
    addChannels: (state, action) => {
      const channels = action.payload;
      const entities = {};
      for (const channel of channels) {
        entities[channel.id] = channel;
      }
      const ids = channels.map((channel) => channel.id);
      state.entities = entities;
      state.ids = ids;
    },
    removeChannel: (state, action) => {
      const { channelId } = action.payload;
      delete state.entities[channelId];
      state.ids = state.ids.filter((id) => id !== channelId);
    },
    updateChannel: (state, action) => {
      const { channelId, data } = action.payload;
      Object.assign(state.entities[channelId], data);
    },
  },
});

export const { addChannel, addChannels, removeChannel, updateChannel } = channelsSlice.actions;

export default channelsSlice.reducer;
