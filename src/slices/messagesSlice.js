import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  entities: {},
  ids: [],
};

export const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {},
});

export default messagesSlice.reducer;
