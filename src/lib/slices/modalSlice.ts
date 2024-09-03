import { createSlice } from '@reduxjs/toolkit';

export type ModalType = "productForm" | "quickView" | "deleteProduct" | "updateProduct" | "variantModal" | "newBillboard";

interface ModalData {
  title: string;
  description: string;
  images: string[];
  price: number;
  inStock: number;
  category?: string;
  isFeatured?: boolean;
  variants?: { variant: { [key: string]: string[] }, details: { price: number, stock: number } }[];
}


const modalSlice = createSlice({
  name: 'modals',
  initialState: {
    isOpen: false,
    type: null as ModalType | null,
    data: null as ModalData | null,
  },
  reducers: {
    openModal: (state, action: { payload: { type: ModalType; data?: ModalData }; type: string }) => {
      state.isOpen = true;
      state.type = action.payload.type;
      state.data = action.payload.data || null;
    },
    closeModal: (state) => {
      state.isOpen = false;
      state.type = null;
      state.data = null;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;
