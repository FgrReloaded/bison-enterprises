import { createSlice } from '@reduxjs/toolkit';

export type ModalType = "productForm";


const modalSlice = createSlice({
  name: 'modals',
  initialState: {
    isOpen: false,
    type: null as ModalType | null,
  },
  reducers: {
    openModal: (state, action: { payload: ModalType; type: string }) => {
      state.isOpen = true;
      state.type = action.payload;
    },
    closeModal: (state) => {
      state.isOpen = false;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;
