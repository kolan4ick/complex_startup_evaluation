'use server';

import React from "react";
import Providers from "@/providers";

export default async function LocaleLayout({children, params: {locale}}:
                                           {
                                               children: React.ReactNode;
                                               params: { locale: string };
                                           }) {
    return (
        <html lang={locale}>
            <body>
                <Providers locale={locale}>
                    {children}
                </Providers>
            </body>
        </html>
    );
}