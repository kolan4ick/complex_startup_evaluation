'use server';

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { loginUser } from "@/hooks/useUser";
import React from "react";

interface ProtectedRouteProps {
    children: React.ReactNode;
    reverse?: boolean;
}

export default async function ProtectedRoute({ children, reverse = false }: ProtectedRouteProps) {
    const cookieStore = await cookies();
    const token = cookieStore.get("auth-token")?.value;

    if (!token) {
        return reverse ? <>{children}</> : redirect(`/login`);
    }

    const user = (await loginUser({ token }))?.user;

    if (!user) {
        cookieStore.set("auth-token", "", { expires: new Date(0) });
    }

    if (reverse) {
        return user ? redirect(`/`) : <>{children}</>;
    }

    return user ? <>{children}</> : redirect(`/login`);
}