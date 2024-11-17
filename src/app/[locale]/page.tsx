'use client';

import { useEffect } from 'react';
import useAppDispatch from '@/hooks/useAppDispatch';
import useAppSelector from '@/hooks/useAppSelector';
import { fetchUser, logout } from '@/store/userSlice';

export default function HomePage() {
    const dispatch = useAppDispatch();
    const { user, status, error } = useAppSelector((state) => state.user);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchUser());
        }
    }, [status, dispatch]);

    return (
        <div>
            {status === 'loading' && <p>Loading...</p>}
            {status === 'failed' && <p>Error: {error}</p>}
            {user ? (
                <div>
                    <h1>Welcome, {user.name}</h1>
                    <button onClick={() => dispatch(logout())}>Logout</button>
                </div>
            ) : (
                <p>No user data available</p>
            )}
        </div>
    );
}
