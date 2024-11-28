'use client';

import React, { useEffect, useState } from "react";
import { useAppSelector } from "@/lib/hooks";
import { useRouter } from "next/navigation";
import {useLocale} from "next-intl";

interface ProtectedRouteProps {
    children: React.ReactNode;
    reverse?: boolean;
}

export default function ProtectedRoute({ children, reverse = false }: ProtectedRouteProps) {
    const [isLoading, setIsLoading] = useState(true);
    const token = useAppSelector((state) => state.auth.token);
    const router = useRouter();
    const locale = useLocale();

    useEffect(() => {
        const handleNavigation = async () => {
            if (reverse && token) {
                router.push(`/${locale}`);
            } else if (!reverse && !token) {
                router.push('/login');
            } else {
                setIsLoading(false); // Only stop loading when navigation is not required
            }
        };

        handleNavigation().then();
    }, [token, reverse, router]);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
                <div className="flex items-center space-x-2">
                    <div
                        className="w-4 h-4 bg-blue-500 rounded-full animate-bounce"
                        style={{ animationDelay: '0s' }}
                    ></div>
                    <div
                        className="w-4 h-4 bg-blue-500 rounded-full animate-bounce"
                        style={{ animationDelay: '0.2s' }}
                    ></div>
                    <div
                        className="w-4 h-4 bg-blue-500 rounded-full animate-bounce"
                        style={{ animationDelay: '0.4s' }}
                    ></div>
                </div>
            </div>
        );
    }

    return <>{children}</>;
}