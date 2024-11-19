import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '@/lib/types/User';

interface AuthState {
    user: User | null;
    token: string | null;
}

const initialState: AuthState = {
    user: null,
    token: null,
};

const usersSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser(state, action: PayloadAction<User | null>) {
            state.user = action.payload;
        },
        setToken(state, action: PayloadAction<string | null>) {
            state.token = action.payload;
        },
        clearAuth(state) {
            state.user = null;
            state.token = null;
        },
    },
});

export const { setUser, setToken, clearAuth } = usersSlice.actions;
export default usersSlice.reducer;
