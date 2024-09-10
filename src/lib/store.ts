import { configureStore } from '@reduxjs/toolkit';
import sidebarReducer from './slices/sidebarSlice';
import userProfileReducer from './slices/userSlice';
import modalSlice from './slices/modalSlice';
import cartSlice from './slices/cartSlice';
import adminSidebarSlice from './slices/adminSidebarSlice';

export const store = configureStore({
    reducer: {
        sidebar: sidebarReducer,
        modal: modalSlice,
        userProfile: userProfileReducer,
        cart: cartSlice,
        adminSidebar: adminSidebarSlice
    },
});


export type RootState = ReturnType<typeof store.getState>;