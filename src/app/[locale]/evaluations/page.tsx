'use server';

import ProtectedRoute from "@/app/components/ProtectedRoute";
import {getTranslations} from "next-intl/server";
import {Metadata} from "next";
import Evaluations from "@/app/components/Pages/Evaluations";
import {getEvaluations} from "@/hooks/useEvaluation";
import {cookies} from "next/headers";

export async function generateMetadata() : Promise<Metadata> {
    const t = await getTranslations({namespace: 'EvaluationsPage'});

    return {
        title: `${t('titles.evaluations')} | ${process.env.NEXT_PUBLIC_SITE_NAME}`,
        description: t('descriptions.evaluations'),
    }
}

export default async function EvaluationsPage() {
    const cookieStore = await cookies();
    const token = cookieStore.get("auth-token")?.value || null;

    const evaluationsData = await getEvaluations({page: 1, perPage: 20, token: token});

    return <ProtectedRoute>
        <Evaluations evaluations={evaluationsData.evaluations} totalPages={evaluationsData.meta.total_pages}/>
    </ProtectedRoute>;
}
