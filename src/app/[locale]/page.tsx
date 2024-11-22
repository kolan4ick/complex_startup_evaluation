'use server';

import ProtectedRoute from "@/app/components/ProtectedRoute";
import Home from "@/app/components/Pages/Home";
import {getTranslations} from "next-intl/server";
import {Metadata} from "next";

export async function generateMetadata() : Promise<Metadata> {
    const t = await getTranslations({namespace: 'HomePage'});

    return {
        title: `${t('titles.home.title')} | ${process.env.NEXT_PUBLIC_SITE_NAME}`,
        description: t('descriptions.home'),
    }
}
export default async function HomePage() {

    return (
        <ProtectedRoute>
            <Home/>
        </ProtectedRoute>
    );
}
