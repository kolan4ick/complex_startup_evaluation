import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiClient from '@/services/apiClient';
import { User, UserState } from '@/types/user';
import {AxiosError} from "axios";

const initialState: UserState = {
    user: null,
    status: 'idle',
    error: null,
};

// Async thunk for fetching user data
export const fetchUser = createAsyncThunk('user/fetchUser', async (_, thunkAPI) => {
    try {
        const response = await apiClient.get<User>('/user');
        return response.data;
    } catch (error) {
        const err = error as AxiosError;
        return thunkAPI.rejectWithValue(err.response?.data);
    }
});

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logout(state) {
            state.user = null;
            state.status = 'idle';
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUser.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchUser.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.user = action.payload;
            })
            .addCase(fetchUser.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload as string;
            });
    },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
