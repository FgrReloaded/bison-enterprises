import { createSlice } from '@reduxjs/toolkit';

const adminSidebarSlice = createSlice({
  name: 'admin-sidebar',
  initialState: {
    isOpen: false,
  },
  reducers: {
    openAdminSidebar: (state) => {
      state.isOpen = true;
    },
    closeAdminSidebar: (state) => {
      state.isOpen = false;
    },
  },
});

export const { openAdminSidebar, closeAdminSidebar } = adminSidebarSlice.actions;
export default adminSidebarSlice.reducer;
