import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  entities: {},
  ids: [],
};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
});

export default usersSlice.reducer;
