'use client';

import {useAppSelector} from "@/lib/hooks";

export default function Home() {
    const user = useAppSelector(state => state.auth.user);

    return (
        <div>
            <h1>Home</h1>
            <p>Welcome to the home page, {user ? user.name : "Guest"}!</p>
        </div>
    );
}
