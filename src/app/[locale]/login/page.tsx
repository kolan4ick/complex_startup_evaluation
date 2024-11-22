'use server';

import Login from "@/app/components/Form/Users/Login";
import ProtectedRoute from "@/app/components/ProtectedRoute";
import {getTranslations} from "next-intl/server";
import {Metadata} from "next";

export async function generateMetadata() : Promise<Metadata> {
    const t = await getTranslations({namespace: 'LoginPage'});

    return {
        title: `${t('titles.login')} | ${process.env.NEXT_PUBLIC_SITE_NAME}`,
        description: t('descriptions.login'),
    }
}

export default async function LoginPage() {
    return <ProtectedRoute reverse={true}>
        <Login></Login>
    </ProtectedRoute>;
}
