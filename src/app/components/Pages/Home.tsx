'use client';

import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { clearAuth } from "@/lib/features/users/usersSlice";
import { useRouter } from "next/navigation";

export default function Home() {
    const dispatch = useAppDispatch();
    const user = useAppSelector(state => state.auth.user);
    const router = useRouter();

    const handleLogout = () => {
        dispatch(clearAuth());

        document.cookie = "auth-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";

        router.push("/login");
    };

    return (
        <div>
            <h1>Home</h1>
            <p>Welcome to the home page, {user ? user.name : "Guest"}!</p>

            {user && (
                <button onClick={handleLogout} className="px-4 py-2 bg-red-500 text-white rounded">
                    Logout
                </button>
            )}
        </div>
    );
}
