import { configureStore } from '@reduxjs/toolkit';
import { authReducer, pointsReducer } from './slices';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        points: pointsReducer
    }
});