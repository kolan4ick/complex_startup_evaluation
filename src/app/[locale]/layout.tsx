'use server';

import "@/app/globals.css";

import React from "react";
import { cookies } from "next/headers";
import { loginUser } from "@/hooks/useUser";
import { User } from "@/lib/types/user";
import { getMessages } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import StoreProvider from "@/app/StoreProvider";

export default async function LocaleLayout({ children, params }: {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}) {
    const {locale} = await params;

    const cookieStorage = await cookies();
    const token = cookieStorage.get("auth-token")?.value || null;
    const messages = await getMessages({ locale });
    let user = null;

    if (token) {
        const userData = await loginUser({ token });
        user = userData?.user as User;
    }

    return (
        <html lang={locale}>
            <body>
                <NextIntlClientProvider messages={messages} locale={locale}>
                    <StoreProvider user={user} token={token}>
                        {children}
                    </StoreProvider>
                </NextIntlClientProvider>
            </body>
        </html>
    );
}
