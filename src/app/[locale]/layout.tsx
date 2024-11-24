'use server';

import "@/app/globals.css";

import React from "react";
import { cookies } from "next/headers";
import { loginUser } from "@/hooks/useUser";
import { User } from "@/lib/types/User";
import { getMessages } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import StoreProvider from "@/app/StoreProvider";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import { ThemeProvider } from "@/app/providers/ThemeProvider";

export default async function LocaleLayout({ children, params }: {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;

    const cookieStorage = await cookies();
    let token = cookieStorage.get("auth-token")?.value || null;
    const messages = await getMessages({ locale });
    let user = null;

    if (token) {
        const userData = await loginUser({ token });
        user = userData?.user as User;

        if (!user) {
            token = null;
        }
    }

    return (
        <html lang={locale} className="h-full">
        <body className="flex flex-col min-h-screen text-gray-800 dark:text-gray-200 bg-gray-100 dark:bg-gray-900">
        <ThemeProvider>
            <NextIntlClientProvider messages={messages} locale={locale}>
                <StoreProvider user={user} token={token}>
                    <Navbar />
                    {/* Main content wrapper */}
                    <main className="flex-grow rounded-lg mx-4 md:mx-8 lg:mx-16 p-4 md:p-8">
                        {children}
                    </main>
                    <Footer />
                </StoreProvider>
            </NextIntlClientProvider>
        </ThemeProvider>
        </body>
        </html>
    );
}
