import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  addChannelModalIsOpen: false,
  removeChannelModalIsOpen: false,
  renameChannelModalIsOpen: false,
};

export const modalsSlice = createSlice({
  name: 'modals',
  initialState,
  reducers: {
    openAddChannelModal: (state) => {
      state.addChannelModalIsOpen = true;
    },
    closeAddChannelModal: (state) => {
      state.addChannelModalIsOpen = false;
    },
    openRemoveChannelModal: (state) => {
      state.removeChannelModalIsOpen = true;
    },
    closeRemoveChannelModal: (state) => {
      state.removeChannelModalIsOpen = false;
    },
    openRenameChannelModal: (state) => {
      state.renameChannelModalIsOpen = true;
    },
    closeRenameChannelModal: (state) => {
      state.renameChannelModalIsOpen = false;
    },
  },
});

export const {
  openAddChannelModal,
  openRemoveChannelModal,
  openRenameChannelModal,
  closeAddChannelModal,
  closeRemoveChannelModal,
  closeRenameChannelModal,
} = modalsSlice.actions;

export default modalsSlice.reducer;
