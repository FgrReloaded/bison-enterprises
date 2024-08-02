import { configureStore } from '@reduxjs/toolkit';
import sidebarReducer from './slices/sidebarSlice';
import userProfileReducer from './slices/userSlice';

export const store = configureStore({
    reducer: {
        sidebar: sidebarReducer,
        userProfile: userProfileReducer
    },
});
