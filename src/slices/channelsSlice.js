import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  entities: {},
  ids: [],
};

export const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {},
});

export default channelsSlice.reducer;
