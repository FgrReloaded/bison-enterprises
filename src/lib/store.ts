import { configureStore } from '@reduxjs/toolkit';
import sidebarReducer from './slices/sidebarSlice';
import userProfileReducer from './slices/userSlice';
import modalSlice from './slices/modalSlice';

export const store = configureStore({
    reducer: {
        sidebar: sidebarReducer,
        modal: modalSlice,
        userProfile: userProfileReducer
    },
});
