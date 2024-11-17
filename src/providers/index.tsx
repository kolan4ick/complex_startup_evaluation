'use client';

// import {ThemeProvider} from "next-themes";
import {NextIntlClientProvider} from "next-intl";
import ReduxProvider from "@/providers/ReduxProvider";
import React from "react";

const Index = ({locale, children} : { locale: string, children: React.ReactNode }) => {
    return (
        <ReduxProvider>
            <NextIntlClientProvider locale={locale}>
                {children}
            </NextIntlClientProvider>
        </ReduxProvider>
    );
}

export default Index;