'use server';

import Register from "@/app/components/Users/Register";
import ProtectedRoute from "@/app/components/ProtectedRoute";
import {getTranslations} from "next-intl/server";
import {Metadata} from "next";

export async function generateMetadata() : Promise<Metadata> {
    const t = await getTranslations({namespace: 'RegisterPage'});

    return {
        title: `${t('titles.registration')} | ${process.env.NEXT_PUBLIC_SITE_NAME}`,
        description: t('descriptions.registration'),
    }
}
export default async function RegisterPage() {
    return <ProtectedRoute reverse={true}>
        <Register></Register>
    </ProtectedRoute>;
}
