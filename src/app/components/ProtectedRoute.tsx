'use server';

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { loginUser } from "@/hooks/useUser";
import React from "react";

interface ProtectedRouteProps {
    children: React.ReactNode;
    reverse?: boolean;
}

export default async function ProtectedRoute({ children, reverse = false}: ProtectedRouteProps) {
    const cookieStore = await cookies();
    const token = cookieStore.get("auth-token")?.value;

    // If no token, handle reverse logic or redirect to login
    if (!token) {
        return reverse ? <>{children}</> : redirect(`/login`);
    }

    // Fetch the user data with the token
    const user = (await loginUser({ token }))?.user;

    // Handle reverse protection (for public pages)
    if (reverse) {
        if (user) {
            return redirect(`/`);
        } else {
            return <>{children}</>;
        }
    }

    // Handle protected routes (for authenticated pages)
    if (user) {
        return <>{children}</>;
    } else {
        return redirect(`/login`);
    }
}
