import { createSlice } from '@reduxjs/toolkit';
import { OrderData } from '../types';

export type ModalType = "productForm" | "quickView" | "deleteProduct" | "updateProduct" | "variantModal" | "newBillboard" | "newBanner" | "newAdmin" | "searchProducts" | "orderDetails";

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
    order: null as OrderData | null,
  },
  reducers: {
    openModal: (state, action: { payload: { type: ModalType; data?: ModalData, order?: OrderData }; type: string }) => {
      state.isOpen = true;
      state.type = action.payload.type;
      state.data = action.payload.data || null;
      state.order = action.payload.order || null;
    },
    closeModal: (state) => {
      state.isOpen = false;
      state.type = null;
      state.data = null;
      state.order = null;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;
