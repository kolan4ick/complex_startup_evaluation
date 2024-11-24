'use server';

import ProtectedRoute from "@/app/components/ProtectedRoute";
import {getTranslations} from "next-intl/server";
import {Metadata} from "next";
import About from "@/app/components/Pages/About";

export async function generateMetadata(): Promise<Metadata> {
    const t = await getTranslations({namespace: 'AboutPage'});

    return {
        title: `${t('titles.about')} | ${process.env.NEXT_PUBLIC_SITE_NAME}`,
        description: t('descriptions.about'),
    }
}

export default async function AboutPage() {

    return (
        <ProtectedRoute>
            <About/>
        </ProtectedRoute>
    );
}
