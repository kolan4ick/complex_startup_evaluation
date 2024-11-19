'use server';

import Profile from "@/app/components/Users/Profile";
import ProtectedRoute from "@/app/components/ProtectedRoute";
import {getTranslations} from "next-intl/server";
import {Metadata} from "next";

export async function generateMetadata() : Promise<Metadata> {
    const t = await getTranslations({namespace: 'ProfilePage'});

    return {
        title: `${t('titles.profile')} | ${process.env.NEXT_PUBLIC_SITE_NAME}`,
        description: t('descriptions.profile'),
    }
}
export default async function RegisterPage() {
    return <ProtectedRoute>
        <Profile></Profile>
    </ProtectedRoute>;
}
