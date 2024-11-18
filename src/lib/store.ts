import { configureStore } from '@reduxjs/toolkit';
import usersReducer from '@/lib/features/users/usersSlice';

export const makeStore = () => {
    return configureStore({
        reducer: {
            auth: usersReducer,
        },
    });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
