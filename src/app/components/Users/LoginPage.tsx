'use client';

import { AppDispatch } from "@/store";
import useAppDispatch from "@/hooks/useAppDispatch";

export default function LoginPage() {
    const dispatch = useAppDispatch();

    const login = (user: { name: string }) => {
        return (dispatch: AppDispatch) => {
            dispatch({ type: 'user/login', payload: user });
        };
    };

    return (
        <div>
            <h1>Login</h1>
            <button onClick={() => dispatch(login({ name: 'User' }))}>Login</button>
        </div>
    );
}